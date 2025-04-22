import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import { useDebounce } from "../useDebounce";
import { getFromLocalStorage, saveToLocalStorage } from "../localStorage";
import { LS_CONTENT_KEY } from "../constant";

const extensions = [StarterKit];

const content = getFromLocalStorage(
    LS_CONTENT_KEY,
    "<h1>Welcome</h1><p>This app offers a distraction-free writing environment. Use simple Markdown formatting to structure your text.</p><p>Everything is saved locally on your device: so you can pick up right where you left off.</p>",
);

export const Editor = () => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "prose dark:prose-headings:text-neutral-300 dark:prose-strong:text-neutral-300 mx-auto h-screen border-none px-10 pt-10 font-serif focus:outline-none md:px-0 md:text-xl md:pt-14 dark:text-neutral-300",
            },
        },
    });

    const saveContent = useCallback((value: string) => {
        saveToLocalStorage(LS_CONTENT_KEY, value);
    }, []);

    useDebounce(saveContent, editor?.getHTML() || "", 300);

    return <EditorContent onFocus={() => editor?.commands.focus("end")} editor={editor} />;
};
