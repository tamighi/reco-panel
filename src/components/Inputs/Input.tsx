type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
    return (
        <div className="bg-elevation-3">
            <input
                {...props}
                className={`w-full px-2 py-1 rounded-sm border
                    border-color-highlight-1 focus:border-primary outline-none
                    text-highlight-1 ${props.className ?? ""} `}
            />
        </div>
    );
};

export default Input;
