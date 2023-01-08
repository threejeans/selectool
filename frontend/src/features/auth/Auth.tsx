import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const { type } = useParams();
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    async function SimpleLogin() {
      console.log(code);
      let query = `/api/member/login/${type}?code=${code}`;
      if (type === "naver")
        query += `&state=${process.env.REACT_APP_NAVER_STATE}`;
      console.log(query);
      const res = await axios.get(process.env.REACT_APP_API + query);
      const ACCESS_TOKEN = res.headers["access-token"];
      const REFRESH_TOKEN = res.headers["refresh-token"];
      setCookie("access-token", ACCESS_TOKEN);
      setCookie("refresh-token", REFRESH_TOKEN);
    }
    SimpleLogin();
    navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
  }, []);

  return <div>인증중</div>;
};

export default Auth;
