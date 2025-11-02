import type { ControlTree } from "@/types/base";
import type { FilteredControlTree } from "@/types/filter";
import type { AppControlPath } from "@/types/path";
import type { ValueControlTree } from "@/types/value";

export const getControlsByPath = <T extends AppControlPath>(
    controls: ControlTree,
    path: T,
): FilteredControlTree<T> => {
    const segments = path.split("/");
    let current = controls as any;
    for (const key of segments) {
        if (!(key in current)) return undefined as any;
        current = current[key];
    }
    return current;
};

const nestedMapControlValues = (obj: any): any => {
    if (obj && typeof obj === "object") {
        if ("value" in obj) return obj.value;
        const out: Record<string, any> = {};
        for (const k in obj) {
            out[k] = mapControlValues(obj[k]);
        }
        return out;
    }
    return obj;
};

export const mapControlValues = <T extends ControlTree>(
    obj: T,
): ValueControlTree<T> => {
    return nestedMapControlValues(obj);
};
