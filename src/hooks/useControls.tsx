import { type Control, type Controls } from "@/contexts/ControlsContext";
import React from "react";
import useControlsInternal from "./useControlsInternal";
import { isControlType } from "@/utils";

type UseControlsReturn<T extends Controls> = {
  [K in keyof T]: T[K] extends Control<any> ? T[K]["value"] : T[K];
};

const useControls = <T extends Controls>(values: T): UseControlsReturn<T> => {
  const { settings, setSettings } = useControlsInternal();

  React.useEffect(() => {
    setSettings((old) => ({ ...values, ...old }));
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
