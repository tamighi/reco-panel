import type { Control, Folder } from "@/entities";
import type { AppControlTree } from "./register";
import type { Prettify } from "./utils";

// prettier-ignore
export type ValueControlTree<T extends Folder | Control> = 
   Prettify<{
    [K in keyof T]: 
      T[K] extends Control<infer V> ? V : 
      T[K] extends Folder ? ValueControlTree<T[K]> : 
      never;
}>;

export type AppValueControlTree = ValueControlTree<AppControlTree>;
