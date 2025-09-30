import type { ControlOption } from "@/contexts/ControlsContext";
import Checkbox from "./Checkbox";

type Props = {
    control: ControlOption<boolean>;
    onChange?: (v: boolean) => void;
};

const BooleanControl = ({ control, onChange }: Props) => {
    return (
        <Checkbox checked={control.value} {...control} onChange={onChange} />
    );
};

export default BooleanControl;
