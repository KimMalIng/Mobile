import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Input, Button, Spinner } from "@/Presentation/Component";
import { useRouter } from "next/router";
import { SignUpUseCase, LoginUsecase, SaveCredentialUseCase } from '@/Domain/UseCase';
import { AuthRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";

import style from "@/Presentation/Style/Register.module.css";

const Register = () => {
  const router = useRouter();
  const signUpUseCase = new SignUpUseCase(new AuthRepositoryImpl());
  const saveCredentialUseCase = new SaveCredentialUseCase(new CredentialRepositoryImpl());
  const loginUseCase = new LoginUsecase(new AuthRepositoryImpl());
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [checkPage, setCheckPage] = useState(false);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const idOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const pwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPw(e.target.value);
  };
  const checkPwOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCheckPw(e.target.value);
  };
  const nameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  }
  const nickNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickName(e.target.value);
  }

  const pageChangeOnClick : MouseEventHandler<HTMLButtonElement> = (e) => {
    if(pw !== checkPw){
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    setCheckPage(true);
  }
  const registerOnClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setIsLoading(true);
    try {
      const signUpData = await signUpUseCase.execute({
        id,
        password: pw,
        name,
        nickname: nickName,
        imageUrl: ""
      });
      const loginData = await loginUseCase.execute(id, pw);
      await saveCredentialUseCase.execute("accessToken", loginData.accessToken);
      setIsLoading(false);
    } catch (error) {
      if(error === 500){
        alert("서버 오류");
      }
      else if(error === 403){
        console.log(error);
        alert("정보를 정확히 입력해주세요");
        setCheckPage(false);
        setId("");
        setPw("");
        setCheckPw("");
        setNickName("");
        setName("");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {(isLoading)? (
        <Spinner />
      ) : (
        <></>
      )}
      <div className={style.Register}>
        <div className={style.ContentBox}>
          <h1>회원가입</h1>
          {(checkPage) ? (
            <>
              <Input
                type="id"
                width="100%"
                height="36px"
                text={name}
                fontSize="14px"
                placeHolder={"이름을 입력해주세요"}
                onChange={nameOnChange}
              />
              <Input
                type="id"
                width="100%"
                height="36px"
                text={nickName}
                fontSize="14px"
                placeHolder={"닉네임을 입력해주세요"}
                onChange={nickNameOnChange}
              />
              <Button
                width="100%"
                height="42px"
                fontSize="18px"
                backgroundColor="#49A078"
                color="#FFF"
                imgsrc="#"
                onClick={registerOnClick}
              >
                회원가입  
              </Button>
            </>
          ) : (
            <>
              <Input
                type="id"
                width="100%"
                height="36px"
                text={id}
                fontSize="14px"
                placeHolder={"아이디를 입력해주세요"}
                onChange={idOnChange}
              />
              <Input
                type="password"
                width="100%"
                height="36px"
                text={pw}
                fontSize="14px"
                placeHolder={"비밀번호를 입력해주세요"}
                onChange={pwOnChange}
              />
              <Input
                type="password"
                width="100%"
                height="36px"
                text={checkPw}
                fontSize="14px"
                placeHolder={"비밀번호를 한번 더 입력해주세요"}
                onChange={checkPwOnChange}
              />
            

              <Button
                width="100%"
                height="42px"
                fontSize="18px"
                backgroundColor="#49A078"
                color="#FFF"
                imgsrc="#"
                onClick={pageChangeOnClick}
              >
                정보입력  
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
