import type { AppControlPath } from "@/types/path";
import { useControlsInternal } from "./useControlsInternal";
import { mapControlValues } from "./utils";

export const useControls = <const T extends AppControlPath>(
    path: T = "" as T,
) => {
    const controls = useControlsInternal(path);
    return mapControlValues(controls);
};
