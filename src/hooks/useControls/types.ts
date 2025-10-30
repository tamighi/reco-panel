import type { ControlData, ControlPrimitive } from "@/contexts";

type ControlInput = ControlPrimitive | ControlData<ControlPrimitive>;

export type ControlInputRecords = { [K: string]: ControlInput };

type InputValue<T extends ControlInput> =
    T extends ControlData<ControlPrimitive> ? T["value"] : T;

export type ControlValues<T extends ControlInputRecords> = {
    [K in keyof T]: InputValue<T[K]>;
};
