import type { ControlOption } from "@/contexts/ControlsContext";
import Slider from "./Slider";

type Props = {
  control: ControlOption<number>;
  onChange?: (v: number) => void;
};

const NumberControl = ({ control, onChange }: Props) => {
  return (
    <>
      {control.min && control.max ? (
        <Slider value={control.value} onChange={(v) => onChange?.(v)} />
      ) : (
        <input
          type="number"
          value={control.value}
          step="0.01"
          onChange={(e) => onChange?.(Number(e.target.value))}
        />
      )}
    </>
  );
};

export default NumberControl;
