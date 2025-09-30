import React from "react";

export type ControlPrimitive = number | boolean;

export type BaseControlOption<T extends ControlPrimitive = ControlPrimitive> = {
    value: T;
    label?: string;
};

export type NumberControlOption = {
    step?: number;
    min?: number;
    max?: number;
};

export type ControlOption<T extends ControlPrimitive = ControlPrimitive> =
    BaseControlOption<T> & (T extends number ? NumberControlOption : {});

export type ControlsRecord = { [K: string]: ControlOption<ControlPrimitive> };

export type ControlsContextType = {
    settings: ControlsRecord;
    setSettings: React.Dispatch<React.SetStateAction<ControlsRecord>>;
};

const ControlsContext = React.createContext<ControlsContextType | null>(null);

export default ControlsContext;
