import Auth from "features/auth/Auth";
import Login from "features/auth/Login";
import SignUp from "features/auth/SignUp";
import Guide from "features/guide/Guide";
import LandingPage from "features/landing/LandingPage";
import Self from "features/self/Self";
import With from "features/with/With";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import Layout from "./components/Layout";
import "./styles/globals.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

// url이름은 임시로 달아놨습니다.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout title={"홈"} description={""} children={<LandingPage />} />
  },
  {
    path: "self",
    element: <Layout title={"혼자써요"} description={""} children={<Self />} />,
  },
  {
    path: "with",
    element: <Layout title={"함께써요"} description={""} children={<With />} />,
  },
  {
    path: "guide",
    element: <Layout title={"가이드"} description={""} children={<Guide />} />,
  },
  {
    path: "auth/:type",
    element: <Auth />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
