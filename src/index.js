import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/RootStore";
import App from "./views/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./views/About";
import ErrorPage from "./views/ErrorPage";
import MainLayout from "./views/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
