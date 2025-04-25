import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { ArrowLeft, Code, Hash, RotateCw, ArrowDownToLine } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import {
    copyEditorContentToClipboard,
    downloadEditorContentToMarkdownFile,
    eraseEditorCotent,
    copyEditorContentToClipboardAsMarkdown,
    redoLastEditorAction,
    undoLastEditorAction,
} from "../lib/editorActions";

interface ToolbarProps {
    editor: Editor | null;
}

interface ToolbarButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    isDisabled?: boolean;
    label: string;
}

const ToolbarButton = ({ icon, onClick, isDisabled, label }: ToolbarButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        aria-label={label}
        title={label}
        className={clsx(
            "cursor-pointer text-neutral-800 transition-opacity duration-200 dark:text-neutral-300",
            isDisabled ? "opacity-50" : "opacity-100 hover:opacity-80",
        )}
    >
        {icon}
    </button>
);

const ICON_SIZE = 20;

export const Toolbar = ({ editor }: ToolbarProps) => {
    if (!editor) {
        return null;
    }

    const historyButtons = [
        {
            icon: <ArrowLeft size={ICON_SIZE} />,
            onClick: () => undoLastEditorAction(editor),
            isDisabled: !editor.can().undo(),
            label: "Undo",
        },
        {
            icon: <ArrowLeft size={ICON_SIZE} className="rotate-180" />,
            onClick: () => redoLastEditorAction(editor),
            isDisabled: !editor.can().redo(),
            label: "Redo",
        },
    ];

    const contentButtons = [
        {
            icon: <Code size={ICON_SIZE} />,
            onClick: () => copyEditorContentToClipboard(editor),
            label: "Copy as code",
        },
        {
            icon: <Hash size={ICON_SIZE} />,
            onClick: () => copyEditorContentToClipboardAsMarkdown(editor),
            label: "Copy as markdown",
        },
        {
            icon: <ArrowDownToLine size={ICON_SIZE} />,
            onClick: () => downloadEditorContentToMarkdownFile(editor),
            label: "Download as markdown file",
        },
        {
            icon: <RotateCw size={ICON_SIZE} />,
            onClick: () => eraseEditorCotent(editor),
            label: "Clear content",
        },
    ];

    return (
        <div className="flex items-center justify-between gap-10">
            <div className="flex gap-10">
                <div className="flex gap-4">
                    {historyButtons.map((button, index) => (
                        <ToolbarButton key={`history-${index}`} {...button} />
                    ))}
                </div>
                <div className="flex gap-4">
                    {contentButtons.map((button, index) => (
                        <ToolbarButton key={`content-${index}`} {...button} />
                    ))}
                </div>
            </div>

            <div className="group flex-1">
                <div className="invisible flex items-center justify-end gap-4 text-sm opacity-0 transition-opacity duration-500 md:visible md:group-hover:opacity-100">
                    <a
                        className="text-neutral-800 underline opacity-30 transition-opacity duration-200 hover:opacity-100 dark:text-neutral-300"
                        href="https://flavienbonvin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Flavien's website"
                    >
                        Made by Flavien
                    </a>
                    <a
                        href="https://github.com/flavienbonvin/slate"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="View source code on GitHub"
                    >
                        <SiGithub
                            size={ICON_SIZE}
                            className="cursor-pointer text-neutral-800 opacity-30 transition-opacity duration-200 hover:opacity-100 dark:text-neutral-300"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};
