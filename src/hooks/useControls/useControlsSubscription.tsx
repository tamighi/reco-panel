import type { AppControlTree } from "@/types/base";
import type { ControlLeaf } from "@/types/leaf";
import type { AppControlPath } from "@/types/path";
import { deepEqual } from "@/utils";
import React from "react";
import { useControlsContext } from "./useControlsContext";
import { getControlsByPath } from "./utils";

export const useControlsSubscription = <const T extends AppControlPath>(
    path: T,
    callback: (v: ControlLeaf<T>) => void,
) => {
    const { subscribe, get } = useControlsContext();

    const initialControls = React.useMemo(
        () => getControlsByPath(get(), path),
        [],
    );

    const cachedValue = React.useRef<ControlLeaf<T>>(initialControls);

    const internalCallback = React.useCallback(
        (tree: AppControlTree) => {
            const controls = getControlsByPath(tree, path);

            if (!deepEqual(controls, cachedValue.current)) {
                cachedValue.current = controls;
                callback?.(controls);
            }
        },
        [callback],
    );

    React.useEffect(() => {
        const unsub = subscribe(internalCallback);
        return unsub;
    }, []);

    return initialControls;
};
