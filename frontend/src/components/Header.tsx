import React from "react";
import Logo from "assets/selectool_logo.svg";

import styles from "styles/components/Header.module.css";
import { Link, useLocation } from "react-router-dom";

type MenuLinkProps = {
  path: string;
  title: string;
};

const MenuLink = ({ path, title }: MenuLinkProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      className={
        pathname.startsWith(path) ? styles.selected : styles.unselected
      }
      to={path}
    >
      {title}
    </Link>
  );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={"/"}>
          <img className={styles.logo} src={Logo} alt={"셀렉툴 로고"} />
        </Link>

        <div className={styles.menu}>
          <MenuLink path={"/self"} title={"혼자써요"} />
          <MenuLink path={"/with"} title={"함께써요"} />
          <MenuLink path={"/guide"} title={"가이드"} />
          {" | "}
          <MenuLink path={"/login"} title={"로그인"} />
        </div>
      </div>
    </header>
  );
};

export default Header;
