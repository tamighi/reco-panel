import { STORAGE_PREFIX } from "@/constants";
import { type ControlOptions } from "@/types/chore";
import React from "react";
import type { ControlInputRecords, ControlValues } from "@/types/input";
import { loadControlsFromStorage, normalizeControls } from "./utils";
import { useControlsInternal } from "./useControlsInternal";

export const useControls = <T extends ControlInputRecords>(
    controlInputs: T,
    options: ControlOptions = {},
): ControlValues<T> => {
    const normalizedControlInputs = React.useMemo(() => {
        const controls = normalizeControls(controlInputs, options);
        return loadControlsFromStorage(controls);
    }, []);

    const { controls, setControls } = useControlsInternal();

    React.useEffect(() => {
        setControls((old) => ({ ...normalizedControlInputs, ...old }));
    }, [normalizedControlInputs, setControls]);

    const settingValues = React.useMemo(() => {
        return Object.keys(controls).reduce((acc, key) => {
            if (controlInputs[key]) {
                (acc as any)[key] = controls[key].value;
            }
            return acc;
        }, {} as ControlValues<T>);
    }, [controls]);

    React.useEffect(() => {
        Object.entries(controls).forEach(([key, control]) => {
            if (control.store) {
                localStorage.setItem(
                    `${STORAGE_PREFIX}${key}`,
                    JSON.stringify(control.value),
                );
            }
        });
    }, [controls]);

    return settingValues;
};
