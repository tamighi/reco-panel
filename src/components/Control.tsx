import type {
    ControlOption,
    ControlPrimitive,
} from "@/contexts/ControlsContext";
import useControlsInternal from "@/hooks/useControlsInternal";
import React from "react";
import BooleanControl from "./Controls/BooleanControl";
import NumberControl from "./Controls/NumberControl";
import StringControl from "./Controls/StringControl";
import type { ControlProps } from "./Controls/types";

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
    control: ControlOption<T>;
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
        <div
            className="grid grid-cols-[auto_160px] h-row p-1 gap-2 items-center"
        >
            <span className="text-highlight-1 truncate">{control.label}</span>
            <ControlComponent
                control={control}
                onChange={(v) => setControlValue(controlKey, v)}
            />
        </div>
    );
};

export default Control;
