import type { Control, Folder } from "@/entities";
import type { BaseControlOptions } from "./chore";
import type { AppControlPath } from "./path";
import type { AppControlTree } from "./register";
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

export type FolderOptions = BaseControlOptions & {
    open?: boolean;
};

// prettier-ignore
export type TreeControlFolder<P extends AppControlPath> =
    P extends "" ? AppControlTree : 
    P extends AppControlPath ? NavigatePath<AppControlTree, SplitPath<P>> : 
    never;

export type ValueControlFolder<P extends AppControlPath> = ValueControlTree<
    TreeControlFolder<P>
>;

export type ControlFolder = {
    [K: string]: Folder | Control;
};
