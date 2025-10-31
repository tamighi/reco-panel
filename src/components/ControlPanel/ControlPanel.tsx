import { useControlsInternal } from "@/hooks/useControls";
import React from "react";
import { DraggablePanel } from "./DraggablePanel";
import { RecursiveFolder } from "./RecursiveFolder";
import { nestControlsByFolder } from "./utils";

export const ControlPanel = () => {
    const { controls } = useControlsInternal();

    const nestedControls = React.useMemo(
        () => nestControlsByFolder(controls),
        [controls],
    );

    return (
        <DraggablePanel>
            {Object.entries(nestedControls).map(([key, control]) => (
                <RecursiveFolder key={key} nodeKey={key} node={control} />
            ))}
        </DraggablePanel>
    );
};
