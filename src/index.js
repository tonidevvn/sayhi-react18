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
import { getCovid19Stat, getUsers } from "./services";
import Users from "./views/Users";
import Covid19 from "./views/Covid19";

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
        path: "/covid-19",
        loader: () => {
          return getCovid19Stat();
        },
        element: <Covid19 />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users",
        loader: () => {
          return getUsers();
        },
        element: <Users />,
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
