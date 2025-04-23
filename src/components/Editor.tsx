import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import { useDebounce } from "../useDebounce";
import { getFromLocalStorage, saveToLocalStorage } from "../localStorage";
import { defaultContent, LS_CONTENT_KEY } from "../constant";
import { Toolbar } from "./Toolbar";

const extensions = [StarterKit];

const content = getFromLocalStorage(LS_CONTENT_KEY, defaultContent);

export const Editor = () => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: "text-neutral-950 prose-headings:text-neutral-950 dark:prose-headings:text-neutral-300 dark:prose-strong:text-neutral-300 border-none focus:outline-none md:text-xl dark:text-neutral-300",
            },
        },
    });

    const saveContent = useCallback((value: string) => {
        saveToLocalStorage(LS_CONTENT_KEY, value);
    }, []);

    useDebounce(saveContent, editor?.getHTML() || "", 300);

    const handleFocus = () => {
        editor?.commands.focus("end");
    };

    const handleClick = () => {
        if (!editor?.isFocused) {
            editor?.commands.focus("end");
        }
    };

    return (
        <div className="prose mx-auto flex h-screen flex-col px-10 md:px-0">
            <EditorContent
                onClick={handleClick}
                onFocus={handleFocus}
                editor={editor}
                className="flex-1 pt-10 font-serif md:pt-14"
            />
            <Toolbar editor={editor} />
        </div>
    );
};
