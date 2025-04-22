import { useEffect, useRef } from "react";

export const useDebounce = <T>(callback: (value: T) => void, value: T, delay: number) => {
    const firstRender = useRef(true);

    useEffect(() => {
        // Skip the initial render if desired
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const handler = setTimeout(() => {
            callback(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);
};
