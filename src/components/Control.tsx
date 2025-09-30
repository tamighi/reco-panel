import type { ControlOption, ControlPrimitive } from "@/contexts/ControlsContext";
import useControlsInternal from "@/hooks/useControlsInternal";
import BooleanControl from "./BooleanControl";
import NumberControl from "./NumberControl";

type Props<T extends ControlPrimitive> = {
    controlKey: string;
    control: ControlOption<T>;
};

const Control = <T extends ControlPrimitive>({ controlKey, control }: Props<T>) => {
    const { setControlValue } = useControlsInternal();

    return (
        <div className="flex gap-2 items-center">
            <span>{control.label}</span>

            {typeof control.value === "number" ? (
                <NumberControl
                    onChange={(v) => setControlValue(controlKey, v)}
                    control={control as ControlOption<number>}
                />
            ) : typeof control.value === "boolean" ? (
                <BooleanControl
                    control={control as ControlOption<boolean>}
                    onChange={(v) => setControlValue(controlKey, v)}
                />
            ) : null}
        </div>
    );
};

export default Control;
