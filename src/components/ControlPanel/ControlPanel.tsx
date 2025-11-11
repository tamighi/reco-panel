import { useControlsInternal } from "@/hooks/useControls";
import { DraggablePanel } from "./DraggablePanel";
import { RecursiveTree, type RecurseControl } from "./RecursiveTree";
import type { AppControlPath } from "@/types/path";

export const ControlPanel = () => {
    const controls = useControlsInternal();

    return (
        <DraggablePanel>
            {Object.entries(controls).map(([key, control]) => (
                <RecursiveTree
                    key={key}
                    nodeKey={key as AppControlPath}
                    node={control as RecurseControl}
                />
            ))}
        </DraggablePanel>
    );
};
