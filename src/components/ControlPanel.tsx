import useControlsInternal from "@/hooks/useControlsInternal";
import { useDrag } from "@/hooks/useDrag";
import Control from "./Control";
import DragIcon from "./DragIcon";
import React from "react";

const ControlPanel = () => {
    const { controls } = useControlsInternal();

    const [isDragging, setIsDragging] = React.useState(false);

    const panelRef = React.useRef<HTMLDivElement>(null);
    const iconRef = useDrag({
        onDrag: (p) =>
            (panelRef.current!.style.transform = `translate(${p.x}px, ${p.y}px)`),
        onDragStart: () => setIsDragging(true),
        onDragEnd: () => setIsDragging(false),
    });

    return (
        <div
            ref={panelRef}
            className="fixed top-2 right-2 z-[9999] w-rootWidth"
        >
            <div className="flex flex-col text-xs rounded-sm bg-elevation-1">
                <div className="flex justify-center">
                    <DragIcon
                        ref={iconRef}
                        className={
                            isDragging ? "cursor-grabbing" : "cursor-grab"
                        }
                    />
                </div>

                <div className="flex flex-col p-2 bg-elevation-2 rounded-sm">
                    {Object.entries(controls).map(([key, control]) => (
                        <Control key={key} controlKey={key} control={control} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
