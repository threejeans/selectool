import React from "react";
import { Helmet } from "react-helmet";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Helmet>
        <title>SELECTOOL | {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <section>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
