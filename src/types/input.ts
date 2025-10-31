import type { ControlData, ControlPrimitive } from "@/types/chore";

type ControlInput = ControlPrimitive | ControlData;

export type ControlInputRecords = { [K: string]: ControlInput };

type InputValue<T extends ControlInput> = T extends ControlData
    ? T["value"]
    : T;

export type ControlValues<T extends ControlInputRecords> = {
    [K in keyof T]: InputValue<T[K]>;
};
