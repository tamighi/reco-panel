import type { ControlData, ControlPrimitive } from "@/types/chore";

export type ControlProps<T extends ControlPrimitive> = {
    control: ControlData<T>;
    onChange?: (v: T) => void;
};
