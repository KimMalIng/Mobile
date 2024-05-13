import { ProfileNormalImage } from "@/Presentation/Resource";
import { Button, Header } from "@/Presentation/Component";
import style from "@/Presentation/Style/MyPage.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const MyPage = () => {
  const router = useRouter();
  const logout = () => {
    //localStorage.clear();
    router.push("./");
  };
  const fixUserData = () => {
    console.log("try to fix!");
    alert("still not ready yet...");
  };
  const fixUserImage = () => {
    console.log("try to fix!");
    alert("Not ready yet...");
  };

  const openTerms = () => {
    alert("Not ready yet...");
  };

  const deleteUser = () => {
    alert("Not ready yet...");
  };

  return (
    <div className={style.Main}>
      <Header />
      <div className={style.ContentBox}>
        <div className={style.UserData} onClick={fixUserImage}>
          <Image
            src={ProfileNormalImage}
            alt="profile"
            width={150}
            height={150}
          />
          <Button
            width="40px"
            height="40px"
            fontSize="50px"
            backgroundColor="#49A078"
            color="#FFF"
            children={"+"}
            imgsrc="#"
            onClick={fixUserImage}
          />
          <p>userName 님</p>
        </div>
        <div className={style.Functions}>
          <Button
            width="200px"
            height="40px"
            fontSize="20px"
            backgroundColor="#49A078"
            color="#FFF"
            children={"정보 수정"}
            imgsrc="#"
            onClick={fixUserData}
          />
          <Button
            width="200px"
            height="40px"
            fontSize="20px"
            backgroundColor="#49A078"
            color="#FFF"
            children={"로그아웃"}
            imgsrc="#"
            onClick={logout}
          />
        </div>
        <div className={style.etcData}>
          <p onClick={openTerms}>
            <u>이용약관</u>
          </p>
          <p onClick={deleteUser}>
            <u>회원 탈퇴</u>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
