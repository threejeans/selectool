import React from "react";
import Nav from "./Nav";

import styles from "styles/components/Layout.module.css";

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Nav title={title} />
      <section>{children}</section>
    </div>
  );
};

export default Layout;
