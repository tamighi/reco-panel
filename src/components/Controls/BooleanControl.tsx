import { Checkbox } from "../Inputs";
import type { ControlProps } from "./types";

type Props = ControlProps<boolean>;

export const BooleanControl = ({ control, onChange }: Props) => {
    return (
        <Checkbox checked={control.value} {...control} onChange={onChange} />
    );
};
