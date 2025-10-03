export type CheckboxProps = {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    disabled = false,
}) => {
    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div
            className={`w-input h-input rounded flex items-center justify-center
                border border-transparent focus:border-primary
                hover:border-primary
                ${checked ? "bg-primary" : "bg-elevation-3"}
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleChange}
        >
            {checked && (
                <svg
                    className="w-4 h-4 text-elevation-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
    );
};

export default Checkbox;
