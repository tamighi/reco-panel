import type { ControlData, ControlPrimitive } from "@/contexts";

export type ControlProps<T extends ControlPrimitive> = {
    control: ControlData<T>;
    onChange?: (v: T) => void;
};
