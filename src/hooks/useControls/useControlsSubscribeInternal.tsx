import type { AppControlTree } from "@/types/base";
import type { FilteredControlTree } from "@/types/filter";
import type { AppControlPath } from "@/types/path";
import { deepEqual } from "@/utils";
import React from "react";
import { useControlsContext } from "./useControlsContext";
import { getControlsByPath } from "./utils";

export const useControlsSubscribeInternal = <const T extends AppControlPath>(
    path: T,
    callback: (v: FilteredControlTree<T>) => void,
) => {
    const { subscribe, get } = useControlsContext();

    const prevValue = React.useRef<FilteredControlTree<T>>(
        getControlsByPath(get(), path),
    );

    const internalCallback = React.useCallback(
        (controls: AppControlTree) => {
            const filteredControls = getControlsByPath(controls, path);

            if (!deepEqual(filteredControls, prevValue.current)) {
                prevValue.current = filteredControls;
                callback?.(filteredControls);
            }
        },
        [callback],
    );

    React.useEffect(() => {
        const unsub = subscribe(internalCallback);
        return unsub;
    }, []);
};
