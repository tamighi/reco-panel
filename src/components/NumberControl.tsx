import type { ControlOption } from "@/contexts/ControlsContext";
import Slider from "./Slider";

type Props = {
    control: ControlOption<number>;
    onChange?: (v: number) => void;
};

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
