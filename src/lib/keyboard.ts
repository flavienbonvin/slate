export const captureSave = (event: KeyboardEvent, callback: () => void) => {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        callback();
    }
};
