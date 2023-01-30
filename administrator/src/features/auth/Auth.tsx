import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authAdmin, selectTmpEmail } from "./authSlice";

import styles from "styles/pages/auth/Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";

const Auth = () => {
  const tmpEmail = useSelector(selectTmpEmail);
  const authRef = useRef<HTMLInputElement[] | null[]>([]);
  const [inputIndex, setInputIndex] = useState(0);
  const regex = /^[A-Za-z0-9+]*$/;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tmpEmail) {
      navigate("/admin");
    }
  }, []);

  const handleAuthInput = (e: any) => {
    e.preventDefault();
    if (e.key === "Backspace") {
      e.target.value = "";
      if (inputIndex > 0) setInputIndex(inputIndex - 1);
      else if (inputIndex === 0) authRef.current[inputIndex]?.focus();
    } else if (e.key.length < 2 && regex.test(e.key)) {
      e.target.value = e.key;
      if (inputIndex < 5) setInputIndex(inputIndex + 1);
      else {
        let tmpAuth = "";
        authRef.current.map((item, _) => {
          tmpAuth += item?.value;
        });
        console.log(tmpAuth);
        dispatch(authAdmin({ email: tmpEmail, auth: tmpAuth })).then((e) => {
          console.log(e);
          // 인증 후 로직 처리
        });
      }
    }
  };

  useEffect(() => {
    if (authRef.current) {
      authRef.current[inputIndex]?.focus();
    }
  }, [inputIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Selectool Admin Connect</h2>
        <div className={styles.inputBox}>
          {[...Array(parseInt("6"))].map((_, index) => {
            return (
              <input
                key={index}
                ref={(e) => (authRef.current[index] = e)}
                className={styles.input}
                type="text"
                onKeyDown={handleAuthInput}
              />
            );
          })}
          {/* {isWrong && <h5 className={styles.wrongMsg}>{msg}</h5>} */}
        </div>
      </div>
    </div>
  );
};

export default Auth;
