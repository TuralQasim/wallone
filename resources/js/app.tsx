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
        const pages = import.meta.glob("./Pages/*.tsx");
        return pages[`./Pages/${name}.tsx`]();
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
