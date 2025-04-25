import { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { LS_CONTENT_KEY, SAVE_TIMEOUT } from "../constant";
import { saveToLocalStorage } from "./localStorage";

interface Props {
    editor: Editor | null;
}

export const useSaveLocaltStorage = ({ editor }: Props) => {
    const [status, setStatus] = useState<"initial" | "writing" | "saved">("initial");

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!editor) {
            return;
        }

        const handleUpdate = () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            setStatus("writing");

            debounceRef.current = setTimeout(() => {
                setStatus("saved");
                saveToLocalStorage(LS_CONTENT_KEY, editor.getHTML() || "");

                debounceRef.current = null;
            }, SAVE_TIMEOUT);
        };

        editor.on("update", handleUpdate);

        return () => {
            editor?.off("update", handleUpdate);

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [editor]);

    return { status };
};
