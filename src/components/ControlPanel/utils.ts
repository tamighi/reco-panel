import type { ControlDataRecords } from "@/contexts";
import type { FolderNode, NestedControlRecords } from "./types";

export const isFolderNode = (value: unknown): value is FolderNode => {
    return (
        typeof value === "object" &&
        !!value &&
        "isFolder" in value &&
        value.isFolder === true
    );
};

export const nestControlsByFolder = (
    controls: ControlDataRecords,
): NestedControlRecords => {
    const result: NestedControlRecords = {};

    for (const [key, control] of Object.entries(controls)) {
        if (!control.folder) {
            result[key] = control;
            continue;
        }

        const folderPath = control.folder.split("/").filter(Boolean);

        let current: NestedControlRecords = result;

        for (const folderName of folderPath) {
            if (!current[folderName]) {
                current[folderName] = {
                    name: folderName,
                    isFolder: true,
                    children: {},
                };
            }

            const node = current[folderName];
            if (isFolderNode(node)) {
                current = node.children;
            }
        }

        current[key] = control;
    }

    return result;
};
