import ControlPanel from "@/components/ControlPanel";
import { ControlsContext, type ControlsRecord } from "@/contexts";
import React from "react";

type ControlsProviderOptions = {
    hidden?: boolean;
    children?: React.ReactNode;
};

const ControlsProvider = ({
    children,
    ...options
}: ControlsProviderOptions) => {
    const { hidden = false } = options;
    const [controls, setControls] = React.useState<ControlsRecord>({});

    return (
        <ControlsContext value={{ controls, setControls }}>
            {!hidden && <ControlPanel />}
            {children}
        </ControlsContext>
    );
};

export default ControlsProvider;
