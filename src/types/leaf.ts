import type { AppControlTree } from "./base";
import type { AppControlPath } from "./path";
import type { ValueControlTree } from "./value";

type SplitPath<S extends string> = S extends `${infer Head}/${infer Rest}`
    ? [Head, ...SplitPath<Rest>]
    : [S];

type NavigatePath<T, Keys extends string[]> = Keys extends [
    infer Head extends keyof T,
    ...infer Tail extends string[],
]
    ? Tail extends []
        ? T[Head]
        : NavigatePath<T[Head], Tail>
    : never;

// prettier-ignore
export type ControlLeaf<P extends AppControlPath> =
    P extends "" ? AppControlTree : 
    P extends AppControlPath ? NavigatePath<AppControlTree, SplitPath<P>> : 
    never;

export type ValueControlLeaf<P extends AppControlPath> = ValueControlTree<
    ControlLeaf<P>
>;
