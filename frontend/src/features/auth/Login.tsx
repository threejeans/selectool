import axios from "axios";
import React, { useState } from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import Modal from "components/Modal";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { loginModalClose, selectLoginModal } from "./authSlice";

import styles from "styles/pages/auth/Login.module.css";

const Login = () => {
  const isLoginModal = useAppSelector(selectLoginModal);
  const dispatcth = useAppDispatch();
  const closeModal = () => dispatcth(loginModalClose());
  return (
    <Modal
      isModal={isLoginModal}
      setIsModal={() => {
        closeModal();
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>{"셀렉툴이 처음이어도 괜찮아요"}</div>
        <div className={styles.description}>
          {
            "간편 로그인을 통해 툴 정보를 모아보고 관심있는 컨텐츠를 구독해보세요."
          }
        </div>
        <div>
          <LoginButton bg={"#FFFFFF"} img={""} title={"Google"} />
          <LoginButton bg={"#FDDC3F"} img={""} title={"Kakao"} />
          <LoginButton bg={"#03C75A"} img={""} title={"Naver"} />
        </div>
        <div className={styles.privacy}>
          {"로그인은 "}
          <a>{"개인 정보 보호 정책"}</a>
          {" 및 "}
          <a>{"서비스 약관"}</a>
          {"에 동의하는 것을 의미하며, "}
          <br />
          {"서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다."}
        </div>
      </div>
    </Modal>
  );
};

export default Login;

type LoginButtonProps = {
  bg: string;
  img: string;
  title: string;
};
const LoginButton = ({ bg, img, title }: LoginButtonProps) => {
  return (
    <button style={{ backgroundColor: bg }}>
      <div>
        <img src={img} alt={title} />
        {title}
      </div>
    </button>
  );
};
