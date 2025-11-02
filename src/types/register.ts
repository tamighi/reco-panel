import type { ControlInputTree } from "./input";

interface RegisterControlTree {
    controlTree?: ControlInputTree;
}

// export const testTree = {
//     path1: {
//         path2: {
//             x: { value: 2 },
//             y: "hello world",
//             path4: {
//                 h: true,
//             },
//         },
//         path3: {
//             z: { value: 17, step: 2 },
//         },
//     },
// } satisfies ControlInputTree;

// export type RegisteredControlTree = NonNullable<typeof testTree>;

export type RegisteredControlTree = NonNullable<
    RegisterControlTree["controlTree"]
>;
