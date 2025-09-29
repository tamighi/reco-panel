import { Slider as MuiSlider } from "@mui/material";

export type SliderProps = {
  value: number;
  onChange?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const Slider = ({ min, max, step, value, onChange }: SliderProps) => {
  return (
    <div className="w-24">
      <MuiSlider
        marks
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.((e.target as any).value)}
      />
    </div>
  );
};

export default Slider;
