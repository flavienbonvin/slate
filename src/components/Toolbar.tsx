import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { ArrowLeft, Code, Hash, RotateCw } from "lucide-react";
import TurndownService from "turndown";

interface Props {
    editor: Editor | null;
}

const iconSize = 20;

export const Toolbar = ({ editor }: Props) => {
    if (!editor) {
        return null;
    }

    const handleCopyClick = () => {
        const string = editor.getHTML();
        navigator.clipboard.writeText(string);
    };

    const handleMarkdownClick = () => {
        const turndownService = new TurndownService({ headingStyle: "atx" });
        const string = turndownService.turndown(editor.getHTML());
        navigator.clipboard.writeText(string);
    };

    // TODO add an option to restore content
    const handleEraserClick = () => {
        editor.commands.clearContent();
        editor.commands.focus();
    };

    const handlePrevious = () => {
        editor.commands.undo();
    };

    const handleNext = () => {
        editor.commands.redo();
    };

    return (
        <div className="not-prose mb-5 flex justify-between gap-3">
            <span className="flex gap-4">
                <ArrowLeft
                    size={iconSize}
                    onClick={handlePrevious}
                    className={clsx(
                        "cursor-pointer text-neutral-950 dark:text-neutral-300",
                        editor.can().undo() ? "opacity-100" : "opacity-50",
                    )}
                />
                <ArrowLeft
                    size={iconSize}
                    onClick={handleNext}
                    className={clsx(
                        "rotate-180 cursor-pointer text-neutral-950 dark:text-neutral-300",
                        editor.can().redo() ? "opacity-100" : "opacity-50",
                    )}
                />
            </span>
            <span className="flex gap-4">
                <RotateCw
                    size={iconSize}
                    onClick={handleEraserClick}
                    className="cursor-pointer text-neutral-950 dark:text-neutral-300"
                />
                <Code
                    size={iconSize}
                    onClick={handleCopyClick}
                    className="cursor-pointer text-neutral-950 dark:text-neutral-300"
                />
                <Hash
                    size={iconSize}
                    onClick={handleMarkdownClick}
                    className="cursor-pointer text-neutral-950 dark:text-neutral-300"
                />
            </span>
        </div>
    );
};
