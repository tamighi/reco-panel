import type { Dec } from "./utils";
import type { AppValueControlTree } from "./value";

// prettier-ignore
type ControlPath<T, Depth extends number = 5> = 
  [Depth] extends [0] ? never 
  : { [K in keyof T & string]
    : T[K] extends Array<any> ? K
    : T[K] extends Record<string, any> ? K | `${K}/${ControlPath<T[K], Dec<Depth>>}`
    : K;
  }[keyof T & string];

export type AppControlPath = ControlPath<AppValueControlTree>;
