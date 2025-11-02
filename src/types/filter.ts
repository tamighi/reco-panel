import type { AppControlTree } from "./base";
import type { AppControlPath } from "./path";
import type { ResolvedValueControlTree } from "./value";

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

export type FilteredControlTree<P extends AppControlPath> = NavigatePath<
    AppControlTree,
    SplitPath<P>
>;

type FilteredControlTreeArray<Paths extends AppControlPath[]> = {
    [K in keyof Paths]: Paths[K] extends AppControlPath
        ? FilteredControlTree<Paths[K]>
        : never;
};

// prettier-ignore
export type ResolvedFilteredControlTree<P extends AppControlPath | AppControlPath[]> = 
    P extends AppControlPath[] ? FilteredControlTreeArray<P> :
    P extends AppControlPath ? FilteredControlTree<P> :
    never;

export type ResolvedFilteredValueControlTree<
    P extends AppControlPath | AppControlPath[],
> = ResolvedValueControlTree<ResolvedFilteredControlTree<P>>;
