import type { Control, ControlPrimitive } from "./chore";
import type { ControlInputTree } from "./input";
import type { RegisteredControlTree } from "./register";
import type { Unpack } from "./utils";

// prettier-ignore
export type ControlTree<T extends ControlInputTree = {}> = Unpack<{
    [K in keyof T]
      : T[K] extends Control ? T[K]
      : T[K] extends ControlPrimitive ? Pick<Control<T[K]>, "value">
      : T[K] extends ControlInputTree ? ControlTree<T[K]>
      : never;
}>;

export type AppControlTree = ControlTree<RegisteredControlTree>;
