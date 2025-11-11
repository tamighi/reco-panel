export interface Register {}

const testControlTree = {
    fold1: {
        x: {
            value: 5,
        },
        y: 2,
        foldRec: {
            z: "",
        },
    },
    fold3: {
        w: {
            value: 17,
            min: 2,
            step: 1,
            max: 3,
        },
    },
};

export type RegisteredControlTree = typeof testControlTree;

// export type RegisteredControlTree<TRegister = Register> = TRegister extends {
//     controlTree: infer Tree;
// }
//     ? Tree
//     : any;
