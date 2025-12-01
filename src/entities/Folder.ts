import type { ControlOptions } from "@/types/chore";
import type { Control } from "./Control";

type FolderContent = {
    [K: string]: Folder | Control;
};

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
    public normalize(folderKey: string | null, folderOptions: ControlOptions) {
        const keyPrefix = folderKey ? `${folderKey}/` : "";

        const normalizedContent = Object.entries(this.content).reduce(
            (res, [key, value]) => {
                const options = { ...this.options, ...folderOptions };
                return {
                    ...res,
                    [key]: value.normalize(`${keyPrefix}${key}`, options),
                };
            },
            {},
        );

        this.content = normalizedContent;
    }
}
