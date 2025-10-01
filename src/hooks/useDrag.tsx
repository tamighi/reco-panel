import React from "react";

type Position = { x: number; y: number };

type UseDragOptions = {
    onDrag?: (p: Position) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
};

export const useDrag = ({
    onDrag,
    onDragStart,
    onDragEnd,
}: UseDragOptions = {}) => {
    const elementRef = React.useRef<any>(null);

    const [isDragging, setIsDragging] = React.useState(false);
    const [startMouse, setStartMouse] = React.useState({ x: 0, y: 0 });
    const [lastPosition, setLastPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();

        onDragStart?.();
        setIsDragging(true);

        setStartMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startMouse.x;
            const deltaY = e.clientY - startMouse.y;

            const newX = lastPosition.x + deltaX;
            const newY = lastPosition.y + deltaY;

            onDrag?.({ x: newX, y: newY });
        },
        [isDragging, lastPosition, startMouse],
    );

    const handleMouseUp = React.useCallback(
        (e: MouseEvent) => {
            const deltaX = e.clientX - startMouse.x;
            const deltaY = e.clientY - startMouse.y;

            const newX = lastPosition.x + deltaX;
            const newY = lastPosition.y + deltaY;

            setLastPosition({ x: newX, y: newY });

            setIsDragging(false);
            onDragEnd?.();
        },
        [lastPosition, startMouse],
    );

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    React.useEffect(() => {
        elementRef.current?.addEventListener("mousedown", handleMouseDown);
        return () => {
            elementRef.current?.removeEventListener(
                "mousedown",
                handleMouseDown,
            );
        };
    }, [elementRef, handleMouseDown]);

    return elementRef;
};
