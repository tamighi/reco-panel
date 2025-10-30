import React from "react";

type Position = { x: number; y: number; clientX: number; clientY: number };

type UseDragOptions = {
    onDrag?: (p: Position) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
};

const useDrag = ({ onDrag, onDragStart, onDragEnd }: UseDragOptions = {}) => {
    const elementRef = React.useRef<any>(null);

    const [isDragging, setIsDragging] = React.useState(false);
    const [startMouse, setStartMouse] = React.useState({ x: 0, y: 0 });
    const [lastPosition, setLastPosition] = React.useState({ x: 0, y: 0 });

    const handleStart = (clientX: number, clientY: number, e: Event) => {
        e.preventDefault();
        onDragStart?.();
        setIsDragging(true);
        setStartMouse({ x: clientX, y: clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
        handleStart(e.clientX, e.clientY, e);
    };

    const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY, e);
    };

    const handleMove = React.useCallback(
        (clientX: number, clientY: number) => {
            if (!isDragging) return;
            const deltaX = clientX - startMouse.x;
            const deltaY = clientY - startMouse.y;
            const x = lastPosition.x + deltaX;
            const y = lastPosition.y + deltaY;
            onDrag?.({ x, y, clientX, clientY });
        },
        [isDragging, lastPosition, startMouse, onDrag],
    );

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            handleMove(e.clientX, e.clientY);
        },
        [handleMove],
    );

    const handleTouchMove = React.useCallback(
        (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        },
        [handleMove],
    );

    const handleEnd = React.useCallback(
        (clientX: number, clientY: number) => {
            if (!isDragging) return;

            const deltaX = clientX - startMouse.x;
            const deltaY = clientY - startMouse.y;

            const newX = lastPosition.x + deltaX;
            const newY = lastPosition.y + deltaY;

            setLastPosition({ x: newX, y: newY });

            setIsDragging(false);
            onDragEnd?.();
        },
        [lastPosition, startMouse, isDragging],
    );

    const handleMouseUp = React.useCallback(
        (e: MouseEvent) => handleEnd(e.clientX, e.clientY),
        [handleEnd],
    );

    const handleTouchEnd = React.useCallback(
        (e: TouchEvent) => {
            const touch = e.changedTouches[0];
            handleEnd(touch.clientX, touch.clientY);
        },
        [handleEnd],
    );

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove]);

    React.useEffect(() => {
        elementRef.current?.addEventListener("mousedown", handleMouseDown);
        elementRef.current?.addEventListener("touchstart", handleTouchStart);

        return () => {
            elementRef.current?.removeEventListener(
                "mousedown",
                handleMouseDown,
            );
            elementRef.current?.removeEventListener(
                "touchstart",
                handleTouchStart,
            );
        };
    }, [elementRef, handleMouseDown, handleTouchStart]);

    return elementRef;
};

export default useDrag;
