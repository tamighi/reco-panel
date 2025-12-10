export type ControlPrimitive = number | boolean | string;

export type BaseControlOptions = {
    store?: boolean;
    label?: string;
};

type NumberControlOptions = {
    step?: number;
    min?: number;
    max?: number;
} & BaseControlOptions;

// prettier-ignore
export type ControlOptions<T extends ControlPrimitive = ControlPrimitive> = 
    T extends number ? NumberControlOptions : 
    BaseControlOptions;
