import { ControlPanel } from "@/components/ControlPanel";
import { ControlsContext } from "@/contexts/ControlsContext";
import type { ControlOptions } from "@/types/chore";
import type { RegisteredControlTree } from "@/types/register";
import { controlInputTreeToControlTree } from "@/utils/controlInputToBase";
import React from "react";

type ControlsProviderOptions = {
    hidden?: boolean;
    controls: RegisteredControlTree;
    defaultOptions?: ControlOptions;
    children?: React.ReactNode;
};

export const ControlsProvider = ({
    children,
    controls: inputControls,
    defaultOptions,
    hidden = false,
}: ControlsProviderOptions) => {
    const appControlTree = React.useMemo(() => {
        return controlInputTreeToControlTree(inputControls, defaultOptions);
    }, [inputControls]);

    const [controls, setControls] = React.useState(appControlTree);

    React.useEffect(() => {
        setControls(appControlTree);
    }, [appControlTree]);

    return (
        <ControlsContext value={{ controls, setControls }}>
            {!hidden && <ControlPanel />}
            {children}
        </ControlsContext>
    );
};
