export type ControlPrimitive = number | boolean | string;

export type ControlOptions = {
    folder?: string;
    store?: boolean;
};

type BaseControlData<T extends ControlPrimitive = ControlPrimitive> = {
    value: T;
    label?: string;
} & ControlOptions;

type NumberControlData = {
    step?: number;
    min?: number;
    max?: number;
};

export type ControlData<T extends ControlPrimitive = ControlPrimitive> =
    BaseControlData<T> & (T extends number ? NumberControlData : {});

export type ControlDataRecords = { [K: string]: ControlData<ControlPrimitive> };

export type ControlsContextType = {
    controls: ControlDataRecords;
    setControls: React.Dispatch<React.SetStateAction<ControlDataRecords>>;
};
