import type { ControlFolder, FolderOptions } from "@/types/folder";

export class Folder<T extends ControlFolder = ControlFolder> {
    private options: FolderOptions;
    private content: T;
    private path!: string;

    constructor(content: T, options: FolderOptions = {}) {
        this.options = options;
        this.content = content;
    }

    public fillOptions(options: FolderOptions) {
        this.options = { ...options, ...this.options };
    }

    public setPath(path: string) {
        this.path = path;
    }

    public init(parentOptions: FolderOptions, path: string) {
        this.fillOptions(parentOptions);
        this.setPath(path);

        const normalizedContent = Object.entries(this.content).reduce(
            (res, [childKey, value]) => {
                const childPath = `${path}/${childKey}`;

                return {
                    ...res,
                    [childKey]: value.init(this.options, childPath),
                };
            },
            {} as T,
        );

        this.content = normalizedContent;
    }
}
