import type { ControlData, ControlPrimitive } from "@/types/chore";
import { useControlsInternal } from "@/hooks/useControls";
import React from "react";
import {
    BooleanControl,
    NumberControl,
    StringControl,
    type ControlProps,
} from "../Controls";

const CONTROL_REGISTRY = [
    {
        guard: (v: ControlPrimitive) => typeof v === "number",
        component: NumberControl,
    },
    {
        guard: (v: ControlPrimitive) => typeof v === "boolean",
        component: BooleanControl,
    },
    {
        guard: (v: ControlPrimitive) => typeof v === "string",
        component: StringControl,
    },
] as const;

type Props<T extends ControlPrimitive> = {
    controlKey: string;
    control: ControlData<T>;
};

type ControlComponent<T extends ControlPrimitive> = React.ComponentType<
    ControlProps<T>
>;

const getControlComponent = <T extends ControlPrimitive>(
    value: T,
): ControlComponent<T> => {
    const control = CONTROL_REGISTRY.find((reg) => reg.guard(value));
    if (!control) throw new Error(`Unsupported control type`);
    return control.component as ControlComponent<T>;
};

export const Control = <T extends ControlPrimitive>({
    controlKey,
    control,
}: Props<T>) => {
    const { setControlValue } = useControlsInternal();

    const ControlComponent = React.useMemo(
        () => getControlComponent(control.value),
        [],
    );

    return (
        <div className="grid grid-cols-[3fr_6fr] p-1 gap-2 items-center">
            <span className="text-highlight-1 truncate">{control.label}</span>
            <ControlComponent
                control={control}
                onChange={(v) => setControlValue(controlKey, v)}
            />
        </div>
    );
};
