import type { ControlFolder } from "@/types/base";
import type { FolderOptions } from "@/types/folder";
import { Folder } from "./Folder";

export class Tree<T extends ControlFolder = ControlFolder> extends Folder<T> {
    constructor(content: T, options: FolderOptions = {}) {
        super(content, options);
        this.init(options, "");
    }
}
