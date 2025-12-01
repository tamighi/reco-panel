import { useSetControlValue } from "@/hooks/useControls";
import type { ControlType, ControlPrimitive } from "@/types/chore";
import type { AppControlPath } from "@/types/path";
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
    controlKey: AppControlPath;
    control: ControlType<T>;
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

export const ControlInput = <T extends ControlPrimitive>({
    controlKey,
    control,
}: Props<T>) => {
    const setControlValue = useSetControlValue();

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
