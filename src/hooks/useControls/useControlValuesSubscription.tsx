import type { ControlLeaf } from "@/types/leaf";
import type { AppControlPath } from "@/types/path";
import type { ValueControlTree } from "@/types/value";
import React from "react";
import { useControlsSubscription } from "./useControlsSubscription";
import { mapControlValues } from "./utils";

export const useControlValuesSubscription = <const T extends AppControlPath>(
    path: T,
    callback: (v: ValueControlTree<ControlLeaf<T>>) => void,
) => {
    const internalCallback = React.useCallback(
        (controls: ControlLeaf<T>) => {
            const controlValues = mapControlValues(controls);
            callback(controlValues);
        },
        [path, callback],
    );

    const controls = useControlsSubscription(path, internalCallback);
    return mapControlValues(controls);
};
