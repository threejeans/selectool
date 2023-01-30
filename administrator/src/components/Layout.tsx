import React, { useEffect } from "react";
import Header from "./Header";

import styles from "styles/components/Layout.module.css";
import { useAppSelector } from "app/hooks";
import { selectAccessToken } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const accessToken = useAppSelector(selectAccessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken === undefined) navigate("login");
  }, []);
  return (
    <div className={styles.container}>
      <Header title={title} />
      <section>{children}</section>
    </div>
  );
};

export default Layout;
