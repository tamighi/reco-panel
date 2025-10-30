import { ControlPanel } from "@/components";
import { ControlsContext, type ControlDataRecords } from "@/contexts";
import React from "react";

type ControlsProviderOptions = {
    hidden?: boolean;
};

const ControlsProvider = ({
    children,
    ...options
}: ControlsProviderOptions & { children?: React.ReactNode }) => {
    const { hidden = false } = options;
    const [controls, setControls] = React.useState<ControlDataRecords>({});

    return (
        <ControlsContext value={{ controls, setControls }}>
            {!hidden && <ControlPanel />}
            {children}
        </ControlsContext>
    );
};

export default ControlsProvider;
