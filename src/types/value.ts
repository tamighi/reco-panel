import type { AppControlTree, ControlTree } from "./base";
import type { ControlType } from "./chore";
import type { Prettify } from "./utils";

type TreeOrControl = ControlTree | ControlType;

// prettier-ignore
export type ValueControlTree<T extends TreeOrControl> = 
  T extends ControlType ? T["value"] 
  : Prettify<{
    [K in keyof T]: 
      T[K] extends { value: infer V } ? V : 
      T[K] extends ControlTree ? ValueControlTree<T[K]> : 
      never;
}>;

export type AppValueControlTree = ValueControlTree<AppControlTree>;
