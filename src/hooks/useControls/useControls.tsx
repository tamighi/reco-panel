import type { FilteredControlTree } from "@/types/filter";
import type { AppControlPath } from "@/types/path";
import React from "react";
import { useControlsContext } from "./useControlsContext";
import { useControlsSubscription } from "./useControlsSubscription";
import { getControlsByPath } from "./utils";

export const useControls = <const T extends AppControlPath = "">(
    path: T = "" as T,
): FilteredControlTree<T> => {
    const { get } = useControlsContext();

    const initialFilteredControls = React.useMemo(
        () => getControlsByPath(get(), path),
        [],
    );

    const [controls, setControls] = React.useState<FilteredControlTree<T>>(
        initialFilteredControls,
    );

    const callback = React.useCallback((tree: FilteredControlTree<T>) => {
        setControls(tree);
    }, []);

    useControlsSubscription(path, callback);

    return controls;
};
