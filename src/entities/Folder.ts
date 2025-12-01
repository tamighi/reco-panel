import type { ControlOptions } from "@/types/chore";
import type { Control } from "./Control";

// TODO: in types (Tree)
type FolderContent = {
    [K: string]: Folder | Control;
};

// TODO: in types
type FolderOptions = ControlOptions & {
    open?: boolean;
};

export class Folder {
    private content: FolderContent;
    private options: FolderOptions;

    constructor(content: FolderContent, options: FolderOptions = {}) {
        this.options = options;
        this.content = content;
    }

    // TODO: adapt type
    // TODO: adapt logic
    // TODO: Test
    public normalize(folderOptions: ControlOptions) {
        const normalizedContent = Object.entries(this.content).reduce(
            (res, [key, value]) => {
                const options = { ...this.options, ...folderOptions };
                return {
                    ...res,
                    [key]: value.normalize(options, key),
                };
            },
            {},
        );

        this.content = normalizedContent;
    }
}
