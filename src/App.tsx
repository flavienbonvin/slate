import { Editor } from "./components/Editor";

import "@fontsource/bodoni-moda";
import { lazy, Suspense } from "react";

const Toaster = lazy(() => import("sonner").then((module) => ({ default: module.Toaster })));

function App() {
    return (
        <body className="bg-neutral-100 dark:bg-neutral-950">
            <Editor />
            <Suspense fallback={null}>
                <Toaster />
            </Suspense>
        </body>
    );
}

export default App;
