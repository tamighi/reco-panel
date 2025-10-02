import React from "react";
import Input from "../Inputs/Input";
import Slider from "../Inputs/Slider";
import type { ControlProps } from "./types";

type Props = ControlProps<number>;

const NumberControl = ({ control, onChange }: Props) => {
    const [value, setValue] = React.useState(control.value);

    React.useEffect(() => {
        setValue(control.value);
    }, [control]);

    const onInputChange = (v: number) => {
        if (control.max) v = Math.min(v, control.max);
        if (control.min) v = Math.max(v, control.min);

        onChange?.(v);
        setValue(v);
    };

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onInputChange(value);
        }
    };

    return (
        <div className="flex gap-3">
            {control.min !== undefined && control.max !== undefined ? (
                <div className="flex-2">
                    <Slider onChange={onInputChange} {...control} />
                </div>
            ) : null}

            <Input
                className="flex-1"
                type="number"
                onBlur={(e) => onInputChange(Number(e.target.value))}
                onChange={(e) => setValue(Number(e.target.value))}
                onKeyDown={handleEnterPress}
                {...control}
                value={value}
            />
        </div>
    );
};

export default NumberControl;
