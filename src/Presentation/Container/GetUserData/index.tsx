import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Input, Button } from "@/Presentation/Component";

import style from "@/Presentation/Style/Register.module.css";
import { useRouter } from "next/router";

const GetUserData = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");

  const nicknameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const majorOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMajor(e.target.value);
  };
  const universityOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUniversity(e.target.value);
  };
  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (nickname && major && university) {
      router.push("./main");
    } else {
      alert("입력하지 않은 데이터가 있습니다");
    }
  };

  return (
    <div className={style.Register}>
      <div className={style.ContentBox}>
        <h1>몇 가지만 더 입력하면 돼요!</h1>
        <Input
          type="id"
          width="100%"
          height="60px"
          text={nickname}
          fontSize="16px"
          placeHolder={"닉네임을 입력해주세요"}
          onChange={nicknameOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={university}
          fontSize="16px"
          placeHolder={"소속을 입력해주세요"}
          onChange={universityOnChange}
        />
        <Input
          type="id"
          width="100%"
          height="60px"
          text={major}
          fontSize="16px"
          placeHolder={"학과 또는 학부를 입력해주세요"}
          onChange={majorOnChange}
        />
        <Button
          width="100%"
          height="60px"
          fontSize="24px"
          backgroundColor="#49A078"
          color="#FFF"
          imgsrc="#"
          onClick={onSubmit}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default GetUserData;
