import type { ControlsRecord } from "@/contexts/ControlsContext";
import { isControlType } from "@/utils";
import React from "react";
import useControls from "./useControls";

const useStorageControls = (defaultControls: ControlsRecord) => {
  const controlsFromStorage = React.useMemo(
    () =>
      Object.entries(defaultControls).reduce((acc, [key, value]) => {
        const storedValue = localStorage.getItem(`reco-panel-${key}`);
        if (storedValue === null) {
          acc[key] = value;
          return acc;
        }

        try {
          const parsedValue = JSON.parse(storedValue);
          acc[key] = isControlType(value)
            ? { ...value, value: parsedValue }
            : parsedValue;
        } catch {
          acc[key] = value;
        }

        return acc;
      }, {} as ControlsRecord),
    [],
  );

  const controls = useControls(controlsFromStorage);

  React.useEffect(() => {
    Object.entries(controls).forEach(([key, value]) => {
      localStorage.setItem(`reco-panel-${key}`, JSON.stringify(value));
    });
  }, [controls]);

  return controls;
};

export default useStorageControls;
