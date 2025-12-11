import type { AppControlFolder } from "@/types/folder";
import type { AppControlPath } from "@/types/path";
import React from "react";
import { useControlsSubscription } from "./useControlsSubscription";

export const useControls = <const T extends AppControlPath = "">(
    path: T = "" as T,
): AppControlFolder<T> => {
    const callback = React.useCallback((newControls: AppControlFolder<T>) => {
        setControls(newControls);
    }, []);

    const initialControls = useControlsSubscription(path, callback);

    const [controls, setControls] =
        React.useState<AppControlFolder<T>>(initialControls);

    return controls;
};
