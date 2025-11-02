import type { Control, ControlPrimitive } from "@/types/chore";

export type ControlProps<T extends ControlPrimitive> = {
    control: Control<T>;
    onChange?: (v: T) => void;
};
