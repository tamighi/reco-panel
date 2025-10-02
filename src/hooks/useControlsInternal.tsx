import ControlsContext, {
    type ControlPrimitive,
} from "@/contexts/ControlsContext";
import React from "react";

const useControlsInternal = () => {
    const controlsContext = React.useContext(ControlsContext);
    if (!controlsContext) {
        throw new Error("useControls must be used within a ControlsProvider");
    }

    const { controls, setControls } = controlsContext;

    const setControlValue = React.useCallback(
        (key: string, value: ControlPrimitive) => {
            setControls((obj) => {
                obj[key].value = value;
                return obj;
            });
        },
        [controls, setControls],
    );

    return { setControls, controls, setControlValue };
};

export default useControlsInternal;
