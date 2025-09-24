import SettingsControlDialog from "@/components/ControlPanel";
import ControlsContext, { type Controls } from "@/contexts/ControlsContext";
import React from "react";

const ControlsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = React.useState<Controls>({});

  return (
    <ControlsContext value={{ settings, setSettings }}>
      <SettingsControlDialog />
      {children}
    </ControlsContext>
  );
};

export default ControlsProvider;
