import React from "react";
import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./types";

type Props = React.HTMLAttributes<HTMLDivElement> & IconProps;

export const CaretUpIcon = React.forwardRef<HTMLDivElement, Props>(
    ({ size = 20, color = "currentColor", ...props }, ref) => {
        return (
            <BaseIcon ref={ref} {...props}>
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 14L12 9L17 14"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </BaseIcon>
        );
    },
);
