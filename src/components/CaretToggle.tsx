import React from "react";
import { CaretDownIcon, CaretUpIcon } from "./Icons";

type ToggleState = "down" | "up";

type Props = {
    state?: ToggleState;
    onToggle: (state: ToggleState) => void;
    label?: string;
};

export const CaretToggle = ({ state = "down", onToggle, label }: Props) => {
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

    return (
        <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={onIconClick}
        >
            <IconComponent />;
            <span className="text-highlight-1 font-bold">{label}</span>
        </div>
    );
};
