import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { ArrowLeft, Code, Hash, RotateCw, ArrowDownToLine } from "lucide-react";

import {
    copyEditorContentToClipboard,
    downloadEditorContentToMarkdownFile,
    eraseEditorCotent,
    copyEditorContentToClipboardAsMarkdown,
    redoLastEditorAction,
    undoLastEditorAction,
} from "../lib/editorActions";

interface Props {
    editor: Editor | null;
}

const iconSize = 20;

export const Toolbar = ({ editor }: Props) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="not-prose flex gap-10">
            <span className="flex gap-4">
                <ArrowLeft
                    size={iconSize}
                    onClick={() => undoLastEditorAction(editor)}
                    className={clsx(
                        "cursor-pointer text-neutral-800 dark:text-neutral-300",
                        editor.can().undo() ? "opacity-100" : "opacity-50",
                    )}
                />
                <ArrowLeft
                    size={iconSize}
                    onClick={() => redoLastEditorAction(editor)}
                    className={clsx(
                        "rotate-180 cursor-pointer text-neutral-800 dark:text-neutral-300",
                        editor.can().redo() ? "opacity-100" : "opacity-50",
                    )}
                />
            </span>
            <span className="flex gap-4">
                <Code
                    size={iconSize}
                    onClick={() => copyEditorContentToClipboard(editor)}
                    className="cursor-pointer text-neutral-800 dark:text-neutral-300"
                />
                <Hash
                    size={iconSize}
                    onClick={() => copyEditorContentToClipboardAsMarkdown(editor)}
                    className="cursor-pointer text-neutral-800 dark:text-neutral-300"
                />
                <ArrowDownToLine
                    size={iconSize}
                    onClick={() => downloadEditorContentToMarkdownFile(editor)}
                    className="cursor-pointer text-neutral-800 dark:text-neutral-300"
                />
                <RotateCw
                    size={iconSize}
                    onClick={() => eraseEditorCotent(editor)}
                    className="cursor-pointer text-neutral-800 dark:text-neutral-300"
                />
            </span>
        </div>
    );
};
