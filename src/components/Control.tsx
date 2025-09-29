import type { ControlOption } from "@/contexts/ControlsContext";
import useControlsInternal from "@/hooks/useControlsInternal";
import { Checkbox } from "@mui/material";
import Slider from "./Slider";

type Props = {
  control: ControlOption;
  controlKey: string;
};

const Control = ({ controlKey, control }: Props) => {
  const { setControlValue } = useControlsInternal();

  return (
    <div className="flex gap-2 items-center">
      <span>{control.label}</span>
      {typeof control.value === "number" ? (
        <Slider
          value={control.value}
          onChange={(v) => setControlValue(controlKey, v)}
        />
      ) : typeof control.value === "boolean" ? (
        <Checkbox
          sx={{ padding: 0 }}
          checked={control.value}
          onChange={(v) => setControlValue(controlKey, v.target.checked)}
        />
      ) : null}
      <span className="w-8">{control.value}</span>
    </div>
  );
};

export default Control;
