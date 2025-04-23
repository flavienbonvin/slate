import { Editor } from "@tiptap/react";
import { toast } from "sonner";
import TurndownService from "turndown";
import { defaultContent } from "../constant";

export const copyEditorContentToClipboard = (editor: Editor) => {
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

export const copyEditorContentToClipboardAsMarkdown = (editor: Editor) => {
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

export const downloadEditorContentToMarkdownFile = (editor: Editor) => {
    try {
        const turndownService = new TurndownService({ headingStyle: "atx" });
        const markdownContent = turndownService.turndown(editor.getHTML());

        const blob = new Blob([markdownContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "document.md";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Markdown file downloaded", {
            duration: 2000,
        });
    } catch (e) {
        console.error(e);

        toast.error("Failed to download markdown file", {
            duration: 2000,
        });
    }
};

export const eraseEditorCotent = (editor: Editor) => {
    try {
        const content = editor.getHTML();
        editor.commands.setContent(defaultContent);
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

export const undoLastEditorAction = (editor: Editor) => {
    editor.commands.undo();
};

export const redoLastEditorAction = (editor: Editor) => {
    editor.commands.redo();
};
