import type { ControlData } from "@/contexts";

export const isControlType = (v: unknown): v is ControlData<any> => {
    return typeof v === "object" && v !== null && "value" in v;
};
