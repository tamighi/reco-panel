import type {
    ControlOption,
    ControlPrimitive,
} from "@/contexts/ControlsContext";
import useControlsInternal from "@/hooks/useControlsInternal";
import BooleanControl from "./Controls/BooleanControl";
import NumberControl from "./Controls/NumberControl";
import type { ControlProps } from "./Controls/types";
import React from "react";

type Props<T extends ControlPrimitive> = {
    controlKey: string;
    control: ControlOption<T>;
};

type ControlComponent<T extends ControlPrimitive> = React.ComponentType<
    ControlProps<T>
>;

const CONTROL_REGISTRY = {
    number: NumberControl,
    boolean: BooleanControl,
} as const;

const getControlComponent = <T extends ControlPrimitive>(
    value: T,
): ControlComponent<T> => {
    if (typeof value === "number")
        return CONTROL_REGISTRY["number"] as ControlComponent<T>;
    if (typeof value === "boolean")
        return CONTROL_REGISTRY["boolean"] as ControlComponent<T>;
    throw new Error(`Unsupported control type`);
};

const Control = <T extends ControlPrimitive>({
    controlKey,
    control,
}: Props<T>) => {
    const { setControlValue } = useControlsInternal();

    const ControlComponent = React.useMemo(
        () => getControlComponent(control.value),
        [],
    );

    return (
        <div className="flex gap-2 items-center">
            <span>{control.label}</span>
            <ControlComponent
                control={control}
                onChange={(v) => setControlValue(controlKey, v)}
            />
        </div>
    );
};

export default Control;
