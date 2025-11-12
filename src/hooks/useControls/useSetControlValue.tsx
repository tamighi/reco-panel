import { STORAGE_PREFIX } from "@/constants";
import type { ControlTree } from "@/types/base";
import type { ControlPrimitive } from "@/types/chore";
import type { AppControlPath } from "@/types/path";
import React from "react";
import { useControlsContext } from "./useControlsContext";

export const useSetControlValue = () => {
    const { notify } = useControlsContext();

    const setControlValue = React.useCallback(
        (path: AppControlPath, value: ControlPrimitive) => {
            notify((obj) => {
                const keys = path.split("/");

                const newObj = structuredClone(obj);
                let current: ControlTree<any> = newObj;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                }

                const key = keys[keys.length - 1];
                current[key] = { ...current[key], value };

                if (current[key].store) {
                    localStorage.setItem(
                        `${STORAGE_PREFIX}${path}`,
                        JSON.stringify(value),
                    );
                }

                return newObj;
            });
        },
        [notify],
    );

    return setControlValue;
};
