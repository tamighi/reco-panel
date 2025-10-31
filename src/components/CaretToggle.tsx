import React from "react";
import { CaretDownIcon, CaretUpIcon } from "./Icons";

type ToggleState = "down" | "up";

type Props = {
    state?: ToggleState;
    onToggle: (state: ToggleState) => void;
};

const CaretToggle = ({ state = "down", onToggle }: Props) => {
    const [internalState, setInternalState] = React.useState(state);

    React.useEffect(() => {
        setInternalState(state);
    }, [state]);

    const IconComponent = React.useMemo(
        () => (internalState === "down" ? CaretDownIcon : CaretUpIcon),
        [internalState],
    );

    const onIconClick = React.useCallback(() => {
        const newState = internalState === "up" ? "down" : "up";
        setInternalState(newState);
        onToggle(newState);
    }, [internalState]);

    return <IconComponent className="cursor-pointer" onClick={onIconClick} />;
};

export default CaretToggle;
