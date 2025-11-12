import type { ControlLeaf } from "@/types/leaf";
import type { AppControlPath } from "@/types/path";
import React from "react";
import { useControlsSubscription } from "./useControlsSubscription";

export const useControls = <const T extends AppControlPath = "">(
    path: T = "" as T,
): ControlLeaf<T> => {
    const callback = React.useCallback((newControls: ControlLeaf<T>) => {
        setControls(newControls);
    }, []);

    const initialControls = useControlsSubscription(path, callback);

    const [controls, setControls] =
        React.useState<ControlLeaf<T>>(initialControls);

    return controls;
};
