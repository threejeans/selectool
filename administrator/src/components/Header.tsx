import { useAppDispatch } from "app/hooks";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineMenu } from "react-icons/ai";
import Logo from "assets/selectool_logo.svg";
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
        <Link to={"/"}>
          <img className={styles.logo} src={Logo} alt={"셀렉툴 로고"} />
        </Link>
        <div className={styles.menu}>
          <MenuLink path={"contents"} title={"콘텐츠 관리"} />
          <MenuLink path={"data"} title={"데이터 관리"} />
          <MenuLink path={"alarm"} title={"알림 관리"} />
          {" | "}
          <MenuLink path={"login"} title={"로그인"} />
        </div>
        <div className={styles.collaped}>
          <button>
            <AiOutlineMenu className={styles.manuBtn} />
          </button>
          {/* 수정중 */}
        </div>
      </div>
    </div>
  );
};

export default Header;
