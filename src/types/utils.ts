export type Prettify<T> = T extends object
    ? { [K in keyof T]: Prettify<T[K]> }
    : T;

// prettier-ignore
export type Dec<N extends number> =
  N extends 5 ? 4 :
  N extends 4 ? 3 :
  N extends 3 ? 2 :
  N extends 2 ? 1 :
  N extends 1 ? 0 : 0;
