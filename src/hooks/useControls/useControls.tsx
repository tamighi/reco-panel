import { STORAGE_PREFIX } from "@/constants";
import { type ControlOptions } from "@/contexts";
import React from "react";
import type { ControlInputRecords, ControlValues } from "./types";
import useControlsInternal from "./useControlsInternal";
import { loadControlsFromStorage, normalizeControls } from "./utils";

const useControls = <T extends ControlInputRecords>(
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
    }, [normalizedControlInputs]);

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
    }, [settingValues]);

    return settingValues;
};

export default useControls;
