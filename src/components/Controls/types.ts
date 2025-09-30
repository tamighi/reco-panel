import type {
    ControlOption,
    ControlPrimitive,
} from "@/contexts/ControlsContext";

export type ControlProps<T extends ControlPrimitive> = {
    control: ControlOption<T>;
    onChange?: (v: T) => void;
};
