import type { ControlType, ControlPrimitive } from "./chore";

type ControlInput = ControlPrimitive | ControlType;

export type ControlInputTree = { [K: string]: ControlInputTree | ControlInput };
