import { useAppDispatch, useAppSelector } from "app/hooks";

import styles from "styles/pages/auth/Login.module.css";

const Login = () => {
  const dispatcth = useAppDispatch();

  return <div className={styles.container}></div>;
};

export default Login;

type LoginButtonProps = {
  uri: string;
  bg: string;
  img: string;
  title: string;
  color: string;
};
