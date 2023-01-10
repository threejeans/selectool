import Login from 'features/auth/Login';
import React from 'react';
import { Helmet } from 'react-helmet';

import Footer from './Footer';
import Header from './Header';
import Modal from './Modal';

type LayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Login />
      <Header title = {title} />
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
