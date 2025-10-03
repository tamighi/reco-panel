import { useDrag } from "@/hooks/useDrag";
import React from "react";

export type SliderProps = {
    value: number;
    onChange?: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
};

const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step,
}) => {
    const sliderRef = useDrag({
        onDrag: (p) => updateValue(p.clientX),
    });

    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = React.useCallback((clientX: number) => {
        if (!sliderRef.current || !onChange) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const ratio = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width),
        );

        const rawValue = min + ratio * (max - min);
        const finalValue =
            step !== undefined ? Math.round(rawValue / step) * step : rawValue;
        const clampedValue = Math.max(min, Math.min(max, finalValue));

        onChange(clampedValue);
    }, []);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        updateValue(e.clientX);
    }, []);

    const handleTouch = React.useCallback((e: React.TouchEvent) => {
        updateValue(e.touches[0].clientX);
    }, []);

    return (
        <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouch}
            ref={sliderRef}
            className="cursor-pointer w-full flex items-center h-input"
        >
            <div className="relative w-full h-1 bg-elevation-3 rounded-full">
                <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                />
                <div
                    className="absolute top-1/2 -translate-1/2 w-3 h-3
                        bg-primary rounded-full cursor-grab
                        active:cursor-grabbing"
                    style={{ left: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default Slider;
