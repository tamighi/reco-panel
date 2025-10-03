import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const BaseIcon = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={"px-4 py-2 text-highlight-1 " + props.className}
        />
    );
});

export default BaseIcon;
