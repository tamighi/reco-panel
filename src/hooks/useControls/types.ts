import type { ControlData, ControlPrimitive } from "@/contexts";

export type ControlInput = ControlPrimitive | ControlData<ControlPrimitive>;

export type ControlInputRecords = { [K: string]: ControlInput };

export type InputValue<T extends ControlInput> =
    T extends ControlData<ControlPrimitive> ? T["value"] : T;

export type UseControlsReturn<T extends ControlInputRecords> = {
    [K in keyof T]: InputValue<T[K]>;
};
