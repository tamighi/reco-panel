import type { ResolvedFilteredValueControlTree } from "@/types/filter";
import type { AppControlPath } from "@/types/path";
import { deepEqual } from "@/utils";
import React from "react";
import { useControlsInternal } from "./useControlsInternal";
import { getControlsByPath, mapControlValues } from "./utils";

export const useControls = <const T extends AppControlPath | AppControlPath[]>(
    path?: T,
): ResolvedFilteredValueControlTree<T> => {
    const { controls } = useControlsInternal();

    const controlReturn =
        React.useRef<ResolvedFilteredValueControlTree<T>>(null);

    const settingValues = React.useMemo<
        ResolvedFilteredValueControlTree<T>
    >(() => {
        if (!path) return mapControlValues(controls);

        const paths: AppControlPath[] = Array.isArray(path) ? path : [path];
        const results: any = [];

        for (const p of paths) {
            const filteredControls = getControlsByPath(controls, p);
            const result = mapControlValues(filteredControls);
            results.push(result);
        }

        const newVal = Array.isArray(path) ? results : results[0];

        if (!deepEqual(newVal, controlReturn.current)) {
            controlReturn.current = newVal;
        }

        return controlReturn.current as any;
    }, [controls, path]);

    return settingValues;
};
