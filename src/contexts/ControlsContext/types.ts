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
} & BaseControlData<number>;

type BooleanControlData = BaseControlData<boolean>;

type StringControlData = BaseControlData<string>;

// prettier-ignore
export type ControlData<T extends ControlPrimitive = ControlPrimitive> = 
    T extends number ? NumberControlData : 
    T extends boolean ? BooleanControlData : 
    T extends string ? StringControlData :
    never;

export type ControlDataRecords = { [K: string]: ControlData };

export type ControlsContextType = {
    controls: ControlDataRecords;
    setControls: React.Dispatch<React.SetStateAction<ControlDataRecords>>;
};
