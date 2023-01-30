import Alarm from "features/alarm/Alarm";
import Auth from "features/auth/Auth";
import Login from "features/auth/Login";
import Contents from "features/contents/Contents";
import ContentsList from "features/contents/ContentsList";
import Guide from "features/contents/Guide";
import Self from "features/contents/Self";
import With from "features/contents/With";
import Data from "features/data/Data";
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
    path: "/",
    // path: "/admin",
    element: (
      <Layout title={"관리자 페이지"}>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "contents",
        children: [
          {
            path: "",
            element: <Contents />,
          },
          {
            path: "self",
            children: [
              { path: "write", element: <Self /> },
              { path: "list", element: <ContentsList type="self" /> },
            ],
          },
          {
            path: "with",
            children: [
              { path: "write", element: <With /> },
              { path: "list", element: <ContentsList type="with" /> },
            ],
          },
          {
            path: "guide",
            children: [
              { path: "write", element: <Guide /> },
              { path: "list", element: <ContentsList type="guide" /> },
            ],
          },
        ],
      },
      {
        path: "data",
        element: <Data />,
      },
      {
        path: "alarm",
        element: <Alarm />,
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
