import type { ControlTree } from "@/types/base";
import type { ControlOptions } from "@/types/chore";
import type { AppControlPath } from "@/types/path";
import { isControlTree } from "@/utils";
import { ControlInput } from "./ControlInput";
import { Folder } from "./Folder";

export type RecurseControl = ControlTree | ControlOptions;

type Props<T extends RecurseControl> = {
    node: T;
    nodeKey: AppControlPath;
};

export const RecursiveTree = <T extends RecurseControl>({
    node,
    nodeKey,
}: Props<T>) => {
    return (
        <>
            {isControlTree(node) ? (
                <Folder label={nodeKey}>
                    {Object.entries(node).map(([key, node]) => {
                        return (
                            <RecursiveTree
                                node={node}
                                nodeKey={`${nodeKey}/${key}` as AppControlPath}
                                key={key}
                            />
                        );
                    })}
                </Folder>
            ) : (
                <ControlInput controlKey={nodeKey} control={node} />
            )}
        </>
    );
};
