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
    const [isDragging, setIsDragging] = React.useState(false);
    const sliderRef = React.useRef<HTMLDivElement>(null);

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
        setIsDragging(true);
        updateValue(e.clientX);
    }, []);

    const handleMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                updateValue(e.clientX);
            }
        },
        [isDragging],
    );

    const handleMouseUp = React.useCallback(() => {
        setIsDragging(false);
    }, []);

    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging]);

    return (
        <div
            onMouseDown={handleMouseDown}
            className="cursor-pointer w-full h-5 flex items-center"
        >
            <div
                ref={sliderRef}
                className="relative w-full h-1 bg-elevation-3 rounded-full"
            >
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
