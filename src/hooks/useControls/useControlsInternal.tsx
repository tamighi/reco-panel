import { STORAGE_PREFIX } from "@/constants";
import { ControlsContext } from "@/contexts/ControlsContext";
import type { ControlTree } from "@/types/base";
import type { ControlPrimitive } from "@/types/chore";
import type { AppControlPath } from "@/types/path";
import React from "react";

export const useControlsInternal = () => {
    const controlsContext = React.useContext(ControlsContext);
    if (!controlsContext) {
        throw new Error("useControls must be used within a ControlsProvider");
    }

    const { controls, setControls } = controlsContext;

    const setControlValue = React.useCallback(
        (path: AppControlPath, value: ControlPrimitive) => {
            setControls((obj) => {
                const keys = path.split("/");

                let current: ControlTree<any> = obj;
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

                return { ...obj };
            });
        },
        [setControls],
    );

    return { setControls, controls, setControlValue };
};
