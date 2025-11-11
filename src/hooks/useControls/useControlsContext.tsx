import { ControlsContext } from "@/contexts/ControlsContext";
import React from "react";

export const useControlsContext = () => {
    const controlsContext = React.useContext(ControlsContext);
    if (!controlsContext) {
        throw new Error("useControls must be used within a ControlsProvider");
    }

    return controlsContext;
};
