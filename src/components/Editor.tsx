import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getFromLocalStorage } from "../lib/localStorage";
import { defaultContent, LS_CONTENT_KEY } from "../constant";
import { useSaveLocalStorage } from "../lib/useSaveLocaltStorage";
import { Dot } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";
import { captureSave } from "../lib/keyboard";

const content = getFromLocalStorage(LS_CONTENT_KEY, defaultContent);

const Toolbar = lazy(() => import("./Toolbar").then((module) => ({ default: module.Toolbar })));

export const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editorProps: {
            scrollThreshold: { top: 0, right: 0, bottom: 80, left: 0 },
            scrollMargin: { top: 0, right: 0, bottom: 80, left: 0 },
            attributes: {
                class: "prose prose-headings:text-current dark:prose-headings:text-current dark:prose-code:text-current mx-auto text-neutral-950 focus:outline-none dark:text-neutral-300",
            },
        },
    });

    const { status, saveData } = useSaveLocalStorage({ editor });

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) =>
            captureSave(e, () => {
                saveData();
            }),
        );
        return () => {
            document.removeEventListener("keydown", (e: KeyboardEvent) =>
                captureSave(e, () => {
                    saveData();
                }),
            );
        };
    }, [saveData]);

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
                <div className="animate-fade-in-out sticky top-3 mr-2 flex h-0 items-center self-end">
                    <Dot className="text-lime-600 dark:text-lime-400" />
                    <p className="text-sm text-neutral-950 dark:text-neutral-300">Saved</p>
                </div>
            )}

            <main className="prose mx-auto w-full flex-1 p-10 md:px-0" onClick={handleClick}>
                <EditorContent
                    onClick={handleClick}
                    onFocus={handleFocus}
                    editor={editor}
                    className="font-serif text-lg"
                />
            </main>

            <footer className="prose sticky bottom-0 mx-auto w-full bg-neutral-100 px-2 py-4 dark:bg-neutral-950 print:hidden">
                <Suspense fallback={null}>
                    <Toolbar editor={editor} />
                </Suspense>
            </footer>
        </div>
    );
};
