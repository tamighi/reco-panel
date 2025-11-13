import { STORAGE_PREFIX } from "@/constants";
import type { ControlTree } from "@/types/base";
import type { Control, ControlOptions, ControlPrimitive } from "@/types/chore";
import type { ControlInputTree } from "@/types/input";
import { isControlInputTree, isControlType } from "./isType";

const fillControlOptions = (control: Control, options: ControlOptions) => {
    (Object.keys(options) as Array<keyof ControlOptions>).forEach((key) => {
        control[key] = control[key] !== undefined ? control[key] : options[key];
    });
};

const normalizeControl = (
    value: Control | ControlPrimitive,
    key: string,
    options: ControlOptions,
) => {
    let control = {} as Control;
    if (isControlType(value)) {
        control = structuredClone(value);
    } else {
        control = { value };
    }

    control.label = control.label ?? key.split("/").pop();

    fillControlOptions(control, options);

    if (control.store) {
        const value = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (value) {
            control.value = JSON.parse(value);
        }
    }

    return control;
};

// TODO: check ts-ignore
const recurseInputTreeToAppTree = <T extends ControlInputTree>(
    controls: T,
    options: ControlOptions = {},
    paths: string[] = [],
): ControlTree<T> => {
    const result = {} as ControlTree<T>;

    for (const [key, value] of Object.entries(controls)) {
        if (isControlInputTree(value)) {
            //@ts-ignore
            result[key] = recurseInputTreeToAppTree(value, options, [
                ...paths,
                key,
            ]);
        } else {
            const path = `${paths.join("/")}/${key}`;
            //@ts-ignore
            result[key] = normalizeControl(value, path, options);
        }
    }

    return result;
};

export const controlInputTreeToControlTree = <T extends ControlInputTree>(
    controls: T,
    options: ControlOptions = {},
): ControlTree<T> => {
    return recurseInputTreeToAppTree(controls, options);
};
