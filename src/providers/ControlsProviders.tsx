import ControlPanel from "@/components/ControlPanel";
import ControlsContext, {
    type ControlsRecord,
} from "@/contexts/ControlsContext";
import React from "react";

const ControlsProvider = ({ children }: { children: React.ReactNode }) => {
    const [controls, setControls] = React.useState<ControlsRecord>({});

    return (
        <ControlsContext value={{ controls, setControls }}>
            <ControlPanel />
            {children}
        </ControlsContext>
    );
};

export default ControlsProvider;
