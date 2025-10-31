import type { ControlDataRecords } from "@/types/chore";
import React from "react";

export type ControlsContextType = {
    controls: ControlDataRecords;
    setControls: React.Dispatch<React.SetStateAction<ControlDataRecords>>;
};

export const ControlsContext = React.createContext<ControlsContextType | null>(
    null,
);
