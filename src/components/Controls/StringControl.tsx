import Input from "../Inputs/Input";
import type { ControlProps } from "./types";

type Props = ControlProps<string>;

const StringControl = ({ control, onChange }: Props) => {
    return <Input {...control} onChange={(e) => onChange?.(e.target.value)} />;
};

export default StringControl;
