import React from "react";
import CaretToggle from "../CaretToggle";
import type { FolderNode } from "./types";

type Props = {
    children?: React.ReactNode;
    folder: FolderNode;
};

const Folder = ({ children, folder }: Props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col">
            <CaretToggle
                state="up"
                onToggle={(state) => setOpen(state === "down")}
                label={folder.name}
            />

            {open && (
                <div className="ml-1 pl-1 border-l border-l-highlight-1">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Folder;
