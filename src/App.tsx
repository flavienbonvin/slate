import { Toaster } from "sonner";
import { Editor } from "./components/Editor";

import "@fontsource/bodoni-moda";

function App() {
    return (
        <body className="bg-neutral-100 dark:bg-neutral-950">
            <Editor />
            <Toaster />
        </body>
    );
}

export default App;
