import type { ControlValue } from "@/contexts/ControlsContext";
import useControlsInternal from "@/hooks/useControlsInternal";
import { getControlLabel, getControlValue } from "@/utils/controls";
import { Checkbox } from "@mui/material";
import React from "react";
import Slider from "./Slider";

type Props = {
  control: ControlValue;
  controlKey: string;
};

const Control = ({ controlKey, control }: Props) => {
  const { setControlValue } = useControlsInternal();

  const label = React.useMemo(
    () => getControlLabel(controlKey, control),
    [control],
  );
  const value = React.useMemo(() => getControlValue(control), [control]);

  return (
    <div className="flex gap-2 items-center">
      <span>{label}</span>
      {typeof value === "number" ? (
        <Slider
          value={value}
          onChange={(v) => setControlValue(controlKey, v)}
        />
      ) : typeof value === "boolean" ? (
        <Checkbox
          sx={{ padding: 0 }}
          checked={value}
          onChange={(v) => setControlValue(controlKey, v.target.checked)}
        />
      ) : null}
      <span className="w-8">{value}</span>
    </div>
  );
};

export default Control;
