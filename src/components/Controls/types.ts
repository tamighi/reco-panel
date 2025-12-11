import type { ControlOptions, ControlPrimitive } from "@/types/chore";

export type ControlProps<T extends ControlPrimitive> = {
    control: ControlOptions<T>;
    onChange?: (v: T) => void;
};
