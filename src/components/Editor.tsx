import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import { useDebounce } from "../useDebounce";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/localStorage";
import { defaultContent, LS_CONTENT_KEY } from "../constant";
import { Toolbar } from "./Toolbar";

const content = getFromLocalStorage(LS_CONTENT_KEY, defaultContent);

export const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editorProps: {
            attributes: {
                class: "prose prose-headings:text-current dark:prose-headings:text-current dark:prose-code:text-current mx-auto text-neutral-950 focus:outline-none dark:text-neutral-300",
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
        <div className="flex min-h-screen w-full flex-col">
            <main
                className="prose mx-auto w-full flex-1 px-10 pt-10 pb-16 md:px-0"
                onClick={handleClick}
            >
                <EditorContent
                    onClick={handleClick}
                    onFocus={handleFocus}
                    editor={editor}
                    className="font-serif text-lg"
                />
            </main>

            <footer className="prose sticky bottom-0 mx-auto w-full bg-neutral-100 px-2 py-4 dark:bg-neutral-950">
                <Toolbar editor={editor} />
            </footer>
        </div>
    );
};
