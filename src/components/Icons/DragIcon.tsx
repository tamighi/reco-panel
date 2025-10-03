import React from "react";
import BaseIcon from "./BaseIcon";
import type { IconProps } from "./types";

type Props = React.HTMLAttributes<HTMLDivElement> & IconProps;

const DragIcon = React.forwardRef<HTMLDivElement, Props>(
    ({ size = 20, color = "currentColor", ...props }, ref) => {
        return (
            <BaseIcon ref={ref} {...props}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="5" cy="9" r="1" fill="currentColor" />
                    <circle cx="12" cy="9" r="1" fill="currentColor" />
                    <circle cx="19" cy="9" r="1" fill="currentColor" />
                    <circle cx="5" cy="15" r="1" fill="currentColor" />
                    <circle cx="12" cy="15" r="1" fill="currentColor" />
                    <circle cx="19" cy="15" r="1" fill="currentColor" />
                </svg>
            </BaseIcon>
        );
    },
);

export default DragIcon;
