import type { Control } from "@/contexts/ControlsContext";

export const isControlType = (v: unknown): v is Control<any> => {
  return typeof v === "object" && v !== null && "value" in v;
};
