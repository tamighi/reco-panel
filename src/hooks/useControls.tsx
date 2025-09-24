import { type Control, type Controls } from "@/contexts/ControlsContext";
import React from "react";
import useControlsInternal from "./useControlsInternal";

type UseControlsReturn<T extends Controls> = {
  [K in keyof T]: T[K] extends Control<any> ? T[K]["value"] : T[K];
};

const useControls = <T extends Controls>(values: T): UseControlsReturn<T> => {
  const controlsContext = useControlsInternal();

  const { settings, setSettings } = controlsContext;

  React.useEffect(() => {
    setSettings((old) => ({ ...values, ...old }));
  }, []);

  return settings as UseControlsReturn<T>;
};

export default useControls;

