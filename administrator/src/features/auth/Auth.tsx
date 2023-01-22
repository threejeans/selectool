import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTmpEmail } from "./authSlice";

import styles from "styles/pages/auth/Auth.module.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const tmpEmail = useSelector(selectTmpEmail);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(tmpEmail);
    if (!tmpEmail) {
      navigate("/admin");
    }
  }, []);

  return <div className={styles.container}></div>;
};

export default Auth;
