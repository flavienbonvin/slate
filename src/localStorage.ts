export const saveToLocalStorage = (key: string, content: string) => {
    try {
        localStorage.setItem(key, content);
    } catch (e) {
        console.log(e);
    }
};

export const getFromLocalStorage = (key: string, defaultValue: string): string => {
    try {
        const item = localStorage.getItem(key)?.trim();
        return item && item !== "<p></p>" ? item : defaultValue;
    } catch (e) {
        console.log(e);

        return defaultValue;
    }
};
