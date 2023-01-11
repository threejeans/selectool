import Logo from "assets/selectool_logo.svg";
import { useAppDispatch } from "app/hooks";
import { Link, useLocation } from "react-router-dom";
import styles from "styles/components/Nav.module.css";

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

const Nav = ({ title }: LayoutProps) => {
  // state
  const dispatcth = useAppDispatch();
  return (
    <div className={styles.container}>
      <Link to={"/admin"}>
        <img className={styles.logo} src={Logo} alt={"셀렉툴 로고"} />
      </Link>
      <div className={styles.menu}>
        <MenuLink path={"/self"} title={"혼자써요"} />
        <MenuLink path={"/with"} title={"함께써요"} />
        <MenuLink path={"/guide"} title={"가이드"} />
        {" | "}
        <MenuLink path={"/admin/mypage"} title={"마이페이지"} />
      </div>
    </div>
  );
};

export default Nav;
