import { Input } from "../Inputs";
import type { ControlProps } from "./types";

type Props = ControlProps<string>;

export const StringControl = ({ control, onChange }: Props) => {
    return <Input {...control} onChange={(e) => onChange?.(e.target.value)} />;
};
