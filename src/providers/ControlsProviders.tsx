import { ControlPanel } from "@/components/ControlPanel";
import { ControlsContext } from "@/contexts/ControlsContext";
import { createStore } from "@/store";
import type { BaseControlOptions } from "@/types/chore";
import type { AppControlTree } from "@/types/register";
import { controlInputTreeToControlTree } from "@/utils/controlInputToBase";
import React from "react";

type ControlsProviderOptions = {
    hidden?: boolean;
    controls: AppControlTree;
    defaultOptions?: BaseControlOptions;
    children?: React.ReactNode;
};

export const ControlsProvider = ({
    children,
    controls: inputControls,
    defaultOptions,
    hidden = false,
}: ControlsProviderOptions) => {
    const tree = React.useMemo(() => {
        return controlInputTreeToControlTree(inputControls, defaultOptions);
    }, [inputControls]);

    const store = React.useMemo(() => {
        return createStore(tree);
    }, []);

    React.useEffect(() => {
        store.notify(tree);
    }, [tree]);

    return (
        <ControlsContext value={store}>
            {!hidden && <ControlPanel />}
            {children}
        </ControlsContext>
    );
};
