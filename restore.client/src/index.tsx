import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";

// Material-ui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { router } from "./app/router/Routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";
import { fetchProductsAsync } from "./features/catalog/catalogSlice";

store.dispatch(fetchProductsAsync());

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
