import type { ControlOption } from "@/contexts/ControlsContext";
import useControlsInternal from "@/hooks/useControlsInternal";
import { Checkbox } from "@mui/material";
import NumberControl from "./NumberControl";

type Props = {
    controlKey: string;
    control: ControlOption;
};

const Control = ({ controlKey, control }: Props) => {
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
                <Checkbox
                    sx={{ padding: 0 }}
                    checked={control.value}
                    onChange={(v) =>
                        setControlValue(controlKey, v.target.checked)
                    }
                />
            ) : null}
        </div>
    );
};

export default Control;
