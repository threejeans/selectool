import Login from "features/auth/Login";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { store } from "./app/store";
import Layout from "./components/Layout";
import "./styles/globals.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <div>뭐야</div>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "home",
        element: (
          <Layout title={"홈"}>
            <Login />
          </Layout>
        ),
      },
      {
        path: "contents",
        element: (
          <Layout title={"컨텐츠 관리"}>
            <Login />
          </Layout>
        ),
      },
      {
        path: "data",
        element: (
          <Layout title={"데이터 관리"}>
            <Login />
          </Layout>
        ),
      },
      {
        path: "alarm",
        element: (
          <Layout title={"알람 관리"}>
            <Login />
          </Layout>
        ),
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
