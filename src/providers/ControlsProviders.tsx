import ControlPanel from "@/components/ControlPanel";
import ControlsContext, {
  type ControlsRecord,
} from "@/contexts/ControlsContext";
import React from "react";

const ControlsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = React.useState<ControlsRecord>({});

  return (
    <ControlsContext value={{ settings, setSettings }}>
      <ControlPanel />
      {children}
    </ControlsContext>
  );
};

export default ControlsProvider;
