import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSearchParams } from "next/navigation";

const LoginCheck = () => {
  const router = useRouter();
  const param = useSearchParams();
  useEffect(() => {
    const accessToken = param.get("accessToken");
    const refreshToken = param.get("refreshToken");
    const userData = localStorage.getItem("userId");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (userData) {
        router.push("/main");
      } else {
        router.push("./getuserdata");
      }
    } else {
      //router.push('./');
      //임시로 일단 토큰 있는 척 하겠습니다
      router.push("./getuserdata");
    }
  });

  return <div></div>;
};

export default LoginCheck;
