import type { Control, ControlPrimitive } from "./chore";

type ControlInput = ControlPrimitive | Control;

export type ControlInputTree = { [K: string]: ControlInputTree | ControlInput };
