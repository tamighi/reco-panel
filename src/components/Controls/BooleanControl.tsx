import Checkbox from "../Checkbox";
import type { ControlProps } from "./types";

type Props = ControlProps<boolean>;

const BooleanControl = ({ control, onChange }: Props) => {
    return (
        <Checkbox checked={control.value} {...control} onChange={onChange} />
    );
};

export default BooleanControl;
