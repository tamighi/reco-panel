import type { AppControlTree } from "@/types/base";
import React from "react";

export type ControlsContextType = {
    controls: AppControlTree;
    setControls: React.Dispatch<React.SetStateAction<AppControlTree>>;
};

export const ControlsContext = React.createContext<ControlsContextType | null>(
    null,
);
