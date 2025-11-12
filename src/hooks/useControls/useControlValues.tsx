import type { AppControlPath } from "@/types/path";
import { useControls } from "./useControls";
import { mapControlValues } from "./utils";

export const useControlValues = <const T extends AppControlPath>(
    path: T = "" as T,
) => {
    const controls = useControls(path);
    return mapControlValues(controls);
};
