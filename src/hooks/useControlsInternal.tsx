import ControlsContext, {
  type ControlPrimitive,
} from "@/contexts/ControlsContext";
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
        [key]: { ...settings[key], value },
      }));
    },
    [settings, setSettings],
  );

  return { setSettings, settings, setControlValue };
};

export default useControlsInternal;
