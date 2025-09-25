import React from "react";
import Slider from "./Slider";
import useControlsInternal from "@/hooks/useControlsInternal";
import { isControlType } from "@/utils";

const ControlPanel = () => {
  const { setSettings, settings } = useControlsInternal();

  const onValueChange = React.useCallback(
    (key: string, value: number) => {
      setSettings((obj) => ({
        ...obj,
        [key]: isControlType(settings[key])
          ? { ...settings[key], value }
          : value,
      }));
    },
    [settings],
  );

  return (
    <div className="fixed top-20 right-20 bg-white z-50 p-2 rounded-sm">
      <div className="flex flex-col">
        {Object.entries(settings).map(([k, v], i) => (
          <div key={i} className="flex gap-2">
            <span>{isControlType(v) ? v.label : k}</span>
            <Slider
              value={isControlType(v) ? v.value : v}
              onChange={(v) => onValueChange(k, v)}
            />
            <span className="w-8">{isControlType(v) ? v.value : v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
