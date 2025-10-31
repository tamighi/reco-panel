import { useDrag } from "@/hooks";
import React from "react";
import CaretToggle from "../CaretToggle";
import { DragIcon } from "../Icons";

type Props = {
    children?: React.ReactNode;
};

const DraggablePanel = ({ children }: Props) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [open, setOpen] = React.useState(true);

    const panelRef = React.useRef<HTMLDivElement>(null);
    const dragElRef = useDrag({
        onDrag: (p) =>
            (panelRef.current!.style.transform = `translate(${p.x}px, ${p.y}px)`),
        onDragStart: () => setIsDragging(true),
        onDragEnd: () => setIsDragging(false),
    });

    return (
        <div
            ref={panelRef}
            className="fixed top-2 right-2 z-[9999] text-root w-rootWidth"
        >
            <div className="flex flex-col rounded-sm bg-elevation-1">
                <div className="flex">
                    <CaretToggle
                        onToggle={(state) => setOpen(state === "down")}
                    />
                    <div
                        ref={dragElRef}
                        className={`flex justify-center flex-1
                            ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    >
                        <DragIcon />
                    </div>
                    <DragIcon className="invisible" />
                </div>

                <div
                    className={`flex-col p-2 bg-elevation-2 rounded-sm
                        ${open ? "flex" : "hidden"}`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DraggablePanel;
