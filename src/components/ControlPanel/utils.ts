import type { ControlDataRecords } from "@/contexts";
import type { NestedControlRecords } from "./types";

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
                    isFolder: true,
                    children: {},
                };
            }

            const node = current[folderName];
            if ("isFolder" in node && node.isFolder) {
                current = node.children;
            }
        }

        current[key] = control;
    }

    return result;
};
