import {
    type ControlOption,
    type ControlPrimitive,
    type ControlsRecord,
} from "@/contexts/ControlsContext";
import { isControlType } from "@/utils";
import React from "react";
import useControlsInternal from "./useControlsInternal";

type ControlInput = ControlPrimitive | ControlOption<ControlPrimitive>;

type ControlInputRecords = { [K: string]: ControlInput };

type InputValue<T extends ControlInput> =
    T extends ControlOption<ControlPrimitive> ? T["value"] : T;

type UseControlsReturn<T extends ControlInputRecords> = {
    [K in keyof T]: InputValue<T[K]>;
};

type UseControlsOptions = {
    store?: boolean;
};

const STORAGE_PREFIX = "reco-panel-";

const loadControlsFromStorage = (controls: ControlsRecord) => {
    const controlsFromStorage = Object.entries(controls).reduce(
        (acc, [key, control]) => {
            const storedValue = localStorage.getItem(`${STORAGE_PREFIX}${key}`);

            if (storedValue === null) {
                acc[key] = control;
                return acc;
            }

            try {
                acc[key] = { ...control, value: JSON.parse(storedValue) };
            } catch {
                acc[key] = control;
            }

            return acc;
        },
        {} as ControlsRecord,
    );

    return controlsFromStorage;
};

const normalizeControls = (controls: ControlInputRecords) => {
    return Object.entries(controls).reduce((acc, [key, value]) => {
        acc[key] = isControlType(value) ? value : { value, label: key };
        return acc;
    }, {} as ControlsRecord);
};

const useControls = <T extends ControlInputRecords>(
    controlInputs: T,
    options: UseControlsOptions = {},
): UseControlsReturn<T> => {
    const { store = false } = options;

    const normalizedControlInputs = React.useMemo(() => {
        const controls = normalizeControls(controlInputs);
        return store ? loadControlsFromStorage(controls) : controls;
    }, []);

    const { settings, setSettings } = useControlsInternal();

    React.useEffect(() => {
        setSettings((old) => ({ ...normalizedControlInputs, ...old }));
    }, [normalizedControlInputs]);

    const settingValues = React.useMemo(() => {
        return Object.keys(settings).reduce((acc, key) => {
            if (controlInputs[key]) {
                (acc as any)[key] = settings[key].value;
            }
            return acc;
        }, {} as UseControlsReturn<T>);
    }, [settings]);

    React.useEffect(() => {
        if (store) {
            Object.entries(settingValues).forEach(([key, value]) => {
                localStorage.setItem(
                    `reco-panel-${key}`,
                    JSON.stringify(value),
                );
            });
        }
    }, [settingValues]);

    return settingValues;
};

export default useControls;
