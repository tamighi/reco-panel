import Input from "../Inputs/Input";
import Slider from "../Inputs/Slider";
import type { ControlProps } from "./types";

type Props = ControlProps<number>;

const NumberControl = ({ control, onChange }: Props) => {
    return (
        <>
            {control.min !== undefined && control.max !== undefined ? (
                <Slider onChange={onChange} {...control} />
            ) : (
                <Input
                    type="number"
                    onChange={(e) => onChange?.(Number(e.target.value))}
                    {...control}
                />
            )}
        </>
    );
};

export default NumberControl;
