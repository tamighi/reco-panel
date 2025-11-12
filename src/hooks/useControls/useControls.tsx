import type { ControlLeaf } from "@/types/leaf";
import type { AppControlPath } from "@/types/path";
import React from "react";
import { useControlsContext } from "./useControlsContext";
import { useControlsSubscription } from "./useControlsSubscription";
import { getControlsByPath } from "./utils";

export const useControls = <const T extends AppControlPath = "">(
    path: T = "" as T,
): ControlLeaf<T> => {
    const { get } = useControlsContext();

    const initialControls = React.useMemo(
        () => getControlsByPath(get(), path),
        [],
    );

    const [controls, setControls] =
        React.useState<ControlLeaf<T>>(initialControls);

    const callback = React.useCallback((newControls: ControlLeaf<T>) => {
        setControls(newControls);
    }, []);

    useControlsSubscription(path, callback);

    return controls;
};
