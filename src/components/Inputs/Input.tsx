type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
    return (
        <input
            {...props}
            className={`w-full px-2 py-1 border h-input rounded bg-elevation-3
                border-transparent focus:border-primary hover:border-primary
                outline-none text-highlight-1 ${props.className ?? ""} `}
        />
    );
};
