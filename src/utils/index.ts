import type { ControlData } from "@/types/chore";

export const isControlType = (v: unknown): v is ControlData<any> => {
    return typeof v === "object" && v !== null && "value" in v;
};
