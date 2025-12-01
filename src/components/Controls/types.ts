import type { ControlType, ControlPrimitive } from "@/types/chore";

export type ControlProps<T extends ControlPrimitive> = {
    control: ControlType<T>;
    onChange?: (v: T) => void;
};
