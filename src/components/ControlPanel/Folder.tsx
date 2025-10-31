import type { FolderNode } from "./types";

type Props = {
    children?: React.ReactNode;
    folder: FolderNode;
};

const Folder = ({ children, folder }: Props) => {
    return (
        <div className="flex flex-col">
            <span className="text-highlight-1">I'm folder {folder.name}</span>
            <div>{children}</div>
        </div>
    );
};

export default Folder;
