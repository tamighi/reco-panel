import React from "react";
import { CaretToggle } from "../CaretToggle";

type Props = {
    children?: React.ReactNode;
    label: string;
};

export const Folder = ({ children, label }: Props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col">
            <CaretToggle
                state="up"
                onToggle={(state) => setOpen(state === "down")}
                label={label}
            />

            <div
                className={`ml-1 pl-1 border-l border-l-highlight-1
                    ${open ? "" : "hidden"}`}
            >
                {children}
            </div>
        </div>
    );
};
