import type { ControlType, ControlPrimitive } from "./chore";
import type { ControlInputTree } from "./input";
import type { RegisteredControlTree } from "./register";
import type { Prettify } from "./utils";

// prettier-ignore
export type ControlTree<T extends ControlInputTree = {}> = Prettify<{
    [K in keyof T]
      : T[K] extends ControlType ? T[K]
      : T[K] extends ControlPrimitive ? Pick<ControlType<T[K]>, "value">
      : T[K] extends ControlInputTree ? ControlTree<T[K]>
      : never;
}>;

export type AppControlTree = ControlTree<RegisteredControlTree>;
