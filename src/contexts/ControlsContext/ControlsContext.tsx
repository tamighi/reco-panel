import React from "react";
import type { ControlsContextType } from "./types";

const ControlsContext = React.createContext<ControlsContextType | null>(null);

export default ControlsContext;
