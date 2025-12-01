export type ControlPrimitive = number | boolean | string;

export type ControlOptions = {
    store?: boolean;
};

type BaseControl<T extends ControlPrimitive> = {
    value: T;
    label?: string;
} & ControlOptions;

type NumberControl = {
    step?: number;
    min?: number;
    max?: number;
} & BaseControl<number>;

type BooleanControl = BaseControl<boolean>;

type StringControl = BaseControl<string>;

// prettier-ignore
export type ControlType<T extends ControlPrimitive = ControlPrimitive> = 
    T extends number ? NumberControl : 
    T extends boolean ? BooleanControl : 
    T extends string ? StringControl :
    never;
