export interface Register {}

export type RegisteredControlTree<TRegister = Register> = TRegister extends {
    controlTree: infer Tree;
}
    ? Tree
    : any;
