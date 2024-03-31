import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
import { Provider } from "react-redux";
import store from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createInertiaApp({
    resolve: (name) => {
        // Используйте динамический импорт для получения страниц из папки Pages и Auth
        const pages = import.meta.glob("./Pages/**/*.tsx");
        const page =
            pages[`./Pages/${name}.tsx`] || pages[`./Pages/Auth/${name}.tsx`];

        if (page) {
            return page().catch((error) => {
                // Вы можете добавить здесь дополнительную обработку ошибок, если нужно
                throw new Error(`Error loading page ${name}: ${error}`);
            });
        }

        throw new Error(
            `Page ${name} not found. Make sure it exists in Pages or Pages/Auth directories.`
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <Provider store={store}>
                    <App {...props} />
                    <ToastContainer
                        autoClose={1000}
                        closeOnClick
                        pauseOnHover
                        theme="light"
                    />
                </Provider>
            </>
        );
    },
});

InertiaProgress.init({ color: "#4B5563" });
