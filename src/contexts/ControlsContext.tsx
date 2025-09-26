import React from "react";

export type ControlPrimitive = number | boolean;

export type ControlOption<T extends ControlPrimitive> = {
  value: T;
  label?: string;
};

export type ControlValue = ControlPrimitive | ControlOption<ControlPrimitive>;

export type ControlsRecord = { [K: string]: ControlValue };

export type ControlsContextType = {
  settings: ControlsRecord;
  setSettings: React.Dispatch<React.SetStateAction<ControlsRecord>>;
};

const ControlsContext = React.createContext<ControlsContextType | null>(null);

export default ControlsContext;
