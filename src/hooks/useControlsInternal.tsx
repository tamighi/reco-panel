import ControlsContext, {
  type ControlPrimitive,
} from "@/contexts/ControlsContext";
import { isControlType } from "@/utils";
import React from "react";

const useControlsInternal = () => {
  const settingsContext = React.useContext(ControlsContext);
  if (!settingsContext) {
    throw new Error("useControls must be used within a ControlsProvider");
  }

  const { setSettings, settings } = settingsContext;

  const setControlValue = React.useCallback(
    (key: string, value: ControlPrimitive) => {
      setSettings((obj) => ({
        ...obj,
        [key]: isControlType(settings[key])
          ? { ...settings[key], value }
          : value,
      }));
    },
    [settings, setSettings],
  );

  return { setSettings, settings, setControlValue };
};

export default useControlsInternal;
