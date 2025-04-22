import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import { useDebounce } from "../useDebounce";
import { getFromLocalStorage, saveToLocalStorage } from "../localStorage";
import { LS_CONTENT_KEY } from "../constant";

const extensions = [StarterKit];

const content = getFromLocalStorage(
    LS_CONTENT_KEY,
    "<p>This is a simple app.</p><p>Where you can write.</p>",
);

export const Editor = () => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "prose dark:prose-headings:text-neutral-300 dark:prose-strong:text-neutral-300 mx-auto h-screen border-none px-10 pt-10 font-serif focus:outline-none md:px-0 md:text-xl dark:text-neutral-300",
            },
        },
    });

    const saveContent = useCallback((value: string) => {
        saveToLocalStorage(LS_CONTENT_KEY, value);
    }, []);

    useDebounce(saveContent, editor?.getHTML() || "", 300);

    return <EditorContent editor={editor} onClick={() => editor?.commands.focus("end")} />;
};
