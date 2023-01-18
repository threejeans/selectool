import Logo from "assets/selectool_logo.svg";
import { useAppDispatch } from "app/hooks";
import { Link, useLocation } from "react-router-dom";
import styles from "styles/components/Header.module.css";

type MenuLinkProps = {
  path: string;
  title: string;
};

type LayoutProps = {
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

const Header = ({ title }: LayoutProps) => {
  // state
  const dispatcth = useAppDispatch();
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to={"/admin"}>
          <img className={styles.logo} src={Logo} alt={"셀렉툴 로고"} />
        </Link>
        <div className={styles.menu}>
          <MenuLink path={"/admin/contents"} title={"콘텐츠 관리"} />
          <MenuLink path={"/admin/data"} title={"데이터 관리"} />
          <MenuLink path={"/admin/alarm"} title={"알림 관리"} />
          {" | "}
          <MenuLink path={"/admin/login"} title={"로그인"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
