import { ControlPanel } from "@/components/ControlPanel";
import { ControlsContext } from "@/contexts/ControlsContext";
import type { ControlDataRecords } from "@/types/chore";
import type { ControlInputRecords } from "@/types/input";
import React from "react";

type ControlsProviderOptions = {
    hidden?: boolean;
    controls?: ControlInputRecords;
};

export const ControlsProvider = ({
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
