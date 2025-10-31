import { useControlsInternal } from "@/hooks";
import Control from "./Control";
import DraggablePanel from "./DraggablePanel";

const ControlPanel = () => {
    const { controls } = useControlsInternal();

    // const nestedControls = React.useMemo(
    //     () => nestControlsByFolder(controls),
    //     [controls],
    // );

    return (
        <DraggablePanel>
            {Object.entries(controls).map(([key, control]) => (
                <Control key={key} controlKey={key} control={control} />
            ))}
        </DraggablePanel>
    );
};

export default ControlPanel;
