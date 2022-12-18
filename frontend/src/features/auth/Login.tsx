import axios from "axios";
import React from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const Login = () => {
  const responseGoogle = (e: Error) => {
    console.log(e);
  };
  const onGoogleSignInSuccess = (res: CredentialResponse) => {
    console.log(res);
    // const params = new URLSearchParams();
    // params.append("idToken", res.clientId.);

    // const googleLogin = async () => {
    //   const res = await axios.post("요청 주소", params, {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   });
    //   console.log(res);
    //   localStorage.setItem("accessToken", res.data.token.access);
    //   localStorage.setItem("refreshToken", res.data.token.refresh);
    // };

    // googleLogin();
  };
  return (
    <div>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
        <GoogleLogin
          text="signup_with"
          onSuccess={onGoogleSignInSuccess}
          onError={() => alert("실패")}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
