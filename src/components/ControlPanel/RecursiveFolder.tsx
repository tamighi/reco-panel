import type { ControlData } from "@/types/chore";
import type { FolderNode } from "./types";
import { isFolderNode } from "./utils";
import { Folder } from "./Folder";
import { Control } from "./Control";

type Props = {
    node: FolderNode | ControlData;
    nodeKey: string;
};

export const RecursiveFolder = ({ node, nodeKey }: Props) => {
    return (
        <>
            {isFolderNode(node) ? (
                <Folder folder={node}>
                    {Object.entries(node.children).map(([key, node]) => {
                        return (
                            <RecursiveFolder
                                node={node}
                                nodeKey={key}
                                key={key}
                            />
                        );
                    })}
                </Folder>
            ) : (
                <Control controlKey={nodeKey} control={node} />
            )}
        </>
    );
};
