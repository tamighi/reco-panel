import type { ControlData } from "@/types/chore";

export type FolderNode = {
    isFolder: true;
    name: string;
    children: { [K: string]: FolderNode | ControlData };
};

export type NestedControlRecords = { [K: string]: FolderNode | ControlData };
