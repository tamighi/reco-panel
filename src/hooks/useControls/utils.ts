import { STORAGE_PREFIX } from "@/constants";
import type {
    ControlData,
    ControlDataRecords,
    ControlOptions,
} from "@/types/chore";
import type { ControlInputRecords } from "@/types/input";
import { isControlType } from "@/utils";

export const loadControlsFromStorage = (controls: ControlDataRecords) => {
    const controlsFromStorage = Object.entries(controls).reduce(
        (acc, [key, control]) => {
            if (!control.store) {
                acc[key] = control;
                return acc;
            }

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
        {} as ControlDataRecords,
    );

    return controlsFromStorage;
};

const fillControlOptions = (control: ControlData, options: ControlOptions) => {
    (Object.keys(options) as Array<keyof ControlOptions>).forEach((key) => {
        if (key === "folder") {
            control[key] = [options[key], control[key]]
                .filter(Boolean)
                .join("/");
        } else {
            control[key] =
                control[key] !== undefined ? control[key] : options[key];
        }
    });
};

export const normalizeControls = (
    controls: ControlInputRecords,
    options: ControlOptions,
) => {
    return Object.entries(controls).reduce((acc, [key, value]) => {
        acc[key] = isControlType(value)
            ? structuredClone(value)
            : { value, label: key };
        fillControlOptions(acc[key], options);
        return acc;
    }, {} as ControlDataRecords);
};
