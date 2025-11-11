import type { FilteredControlTree } from "@/types/filter";
import type { AppControlPath } from "@/types/path";
import type { ValueControlTree } from "@/types/value";
import React from "react";
import { useControlsSubscribeInternal } from "./useControlsSubscribeInternal";
import { mapControlValues } from "./utils";

export const useControlsSubscribe = <const T extends AppControlPath>(
    path: T,
    callback: (v: ValueControlTree<FilteredControlTree<T>>) => void,
) => {
    const internalCallback = React.useCallback(
        (controls: FilteredControlTree<T>) => {
            const controlValues = mapControlValues(controls);
            callback(controlValues);
        },
        [path, callback],
    );

    useControlsSubscribeInternal(path, internalCallback);
};
