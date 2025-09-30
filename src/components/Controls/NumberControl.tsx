import Slider from "../Slider";
import type { ControlProps } from "./types";

type Props = ControlProps<number>;

const NumberControl = ({ control, onChange }: Props) => {
    return (
        <>
            {control.min !== undefined && control.max !== undefined ? (
                <Slider onChange={onChange} {...control} />
            ) : (
                <input
                    type="number"
                    onChange={(e) => onChange?.(Number(e.target.value))}
                    {...control}
                />
            )}
        </>
    );
};

export default NumberControl;
