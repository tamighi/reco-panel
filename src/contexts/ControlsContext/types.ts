export type ControlPrimitive = number | boolean | string;

export type ControlOptions = {
    folder?: string;
    store?: boolean;
};

export type BaseControlData<T extends ControlPrimitive = ControlPrimitive> = {
    value: T;
    label?: string;
} & ControlOptions;

export type NumberControlData = {
    step?: number;
    min?: number;
    max?: number;
};

export type ControlData<T extends ControlPrimitive = ControlPrimitive> =
    BaseControlData<T> & (T extends number ? NumberControlData : {});

export type ControlsRecord = { [K: string]: ControlData<ControlPrimitive> };

export type ControlsContextType = {
    controls: ControlsRecord;
    setControls: React.Dispatch<React.SetStateAction<ControlsRecord>>;
};
