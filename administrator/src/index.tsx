import Auth from "features/auth/Auth";
import Login from "features/auth/Login";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import Layout from "./components/Layout";
import "./styles/globals.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <Layout title={"관리자 페이지"}>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "contents",
        element: <p>contents</p>,
      },
      {
        path: "data",
        element: <p>data</p>,
      },
      {
        path: "alarm",
        element: <p>alarm</p>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
