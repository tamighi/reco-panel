import type { ControlOption } from "@/contexts/ControlsContext";

export const isControlType = (v: unknown): v is ControlOption<any> => {
  return typeof v === "object" && v !== null && "value" in v;
};
