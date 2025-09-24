import ControlsContext from "@/contexts/ControlsContext";
import React from "react";

const useControlsInternal = () => {
  const settingsContext = React.useContext(ControlsContext);
  if (!settingsContext) {
    throw new Error("useControls must be used within a ControlsProvider");
  }

  return settingsContext;
};


export default useControlsInternal;
