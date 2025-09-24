import ControlsContext from "@/contexts/ControlsContext";
import React from "react";

const useSettings = () => {
  const settingsContext = React.useContext(ControlsContext);
  if (!settingsContext) {
    throw new Error("No settings provider");
  }

  return settingsContext;
};


export default useSettings;
