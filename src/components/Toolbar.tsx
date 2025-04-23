import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { ArrowLeft, Code, Hash, RotateCw } from "lucide-react";
import { toast } from "sonner";
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
        try {
            const string = editor.getHTML();
            navigator.clipboard.writeText(string);

            toast.success("Text copied to the clipboard", {
                duration: 2000,
            });
        } catch (e) {
            console.error(e);

            toast.error("Failed to copy text", {
                duration: 2000,
            });
        }
    };

    const handleMarkdownClick = () => {
        try {
            const turndownService = new TurndownService({ headingStyle: "atx" });
            const string = turndownService.turndown(editor.getHTML());
            navigator.clipboard.writeText(string);

            toast.success("Markdown copied to the clipboard", {
                duration: 2000,
            });
        } catch (e) {
            console.error(e);

            toast.error("Failed to convert to markdown", {
                duration: 2000,
            });
        }
    };

    const handleEraserClick = () => {
        try {
            const content = editor.getHTML();
            editor.commands.clearContent();
            editor.commands.focus();

            toast.success("Content cleared", {
                duration: 2000,
                cancel: {
                    label: "Restore",
                    onClick: () => {
                        editor.commands.setContent(content);
                        editor.commands.focus("end");
                    },
                },
            });
        } catch (e) {
            console.error(e);

            toast.error("Failed to clear content", {
                duration: 2000,
            });
        }
    };

    const handlePrevious = () => {
        editor.commands.undo();
    };

    const handleNext = () => {
        editor.commands.redo();
    };

    return (
        <div className="not-prose mb-5 flex gap-10">
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
                <RotateCw
                    size={iconSize}
                    onClick={handleEraserClick}
                    className="cursor-pointer text-neutral-950 dark:text-neutral-300"
                />
            </span>
        </div>
    );
};
