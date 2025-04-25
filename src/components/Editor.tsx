import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getFromLocalStorage } from "../lib/localStorage";
import { defaultContent, LS_CONTENT_KEY } from "../constant";
import { Toolbar } from "./Toolbar";
import { useSaveLocaltStorage } from "../lib/useSaveLocaltStorage";
import { Dot } from "lucide-react";

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

    const { status } = useSaveLocaltStorage({ editor });

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
            {status === "saved" && (
                <div className="animate-fade-in-out absolute top-0 right-0 mr-2 flex items-center">
                    <Dot className="text-lime-600 dark:text-lime-400" />
                    <p className="text-sm text-neutral-950 dark:text-neutral-300">Saved</p>
                </div>
            )}

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

            <footer className="prose sticky bottom-0 mx-auto w-full bg-neutral-100 px-2 py-4 dark:bg-neutral-950 print:hidden">
                <Toolbar editor={editor} />
            </footer>
        </div>
    );
};
