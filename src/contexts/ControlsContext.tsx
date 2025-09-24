import React from "react";

export type ControlType = number;

export type Control<T extends ControlType> = {
  value: T;
  label?: string;
};

export type Controls = { [K: string]: ControlType | Control<ControlType> };

export type ControlsContextType = {
  settings: Controls;
  setSettings: React.Dispatch<React.SetStateAction<Controls>>;
};

const ControlsContext = React.createContext<ControlsContextType | null>(null);

export default ControlsContext;
