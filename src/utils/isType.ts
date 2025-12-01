import type { ControlTree } from "@/types/base";
import type { ControlType } from "@/types/chore";
import type { ControlInputTree } from "@/types/input";

export const isControlInputTree = (v: unknown): v is ControlInputTree => {
    return isControlTree(v);
};

export const isControlTree = (v: unknown): v is ControlTree => {
    return typeof v === "object" && v !== null && !isControlType(v);
};

export const isControlType = (v: unknown): v is ControlType<any> => {
    return typeof v === "object" && v !== null && "value" in v;
};
