import type { ControlFolder } from "./folder";

export interface Register {}

export type AppControlTree<TRegister = Register> = TRegister extends {
    controlTree: infer Tree extends ControlFolder;
}
    ? Tree
    : never;
