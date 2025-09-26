import type { ControlValue } from "@/contexts/ControlsContext";
import { isControlType } from "./isType";

export const getControlLabel = (key: string, control: ControlValue) => {
  return isControlType(control) ? control.label : key;
};

export const getControlValue = (control: ControlValue) => {
  return isControlType(control) ? control.value : control;
};
