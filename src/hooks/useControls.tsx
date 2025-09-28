import {
  type ControlOption,
  type ControlsRecord,
} from "@/contexts/ControlsContext";
import { isControlType } from "@/utils";
import React from "react";
import useControlsInternal from "./useControlsInternal";

type UseControlsReturn<T extends ControlsRecord> = {
  [K in keyof T]: T[K] extends ControlOption<any> ? T[K]["value"] : T[K];
};

const useControls = <T extends ControlsRecord>(
  controls: T,
): UseControlsReturn<T> => {
  const { settings, setSettings } = useControlsInternal();

  React.useEffect(() => {
    setSettings((old) => ({ ...controls, ...old }));
  }, []);

  const onlyValSettings = React.useMemo(
    () =>
      Object.entries(settings).reduce(
        (settings, [k, v]) => ({
          ...settings,
          [k]: isControlType(v) ? v.value : v,
        }),
        {} as UseControlsReturn<T>,
      ),
    [settings],
  );

  return onlyValSettings;
};

export default useControls;
