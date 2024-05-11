import { SERVER_URL } from "@/Const";
import { UserEntity, AuthEntity } from "@/Domain/Entity";

class AuthDataSource {
  static async login(id: string, password: string): Promise<UserEntity> {
    try {
      const res = await fetch(`${SERVER_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: id,
          memberPw: password,
        }),
      });
      console.log(res);
      if (res.status === 200) {
        const data: UserEntity = await res.json();
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }
  static async signup(data: AuthEntity): Promise<UserEntity> {
    try {
      const formData = new FormData();
      formData.append("memberId", data.id);
      formData.append("memberPw", data.password);
      formData.append("name", data.name);
      formData.append("nickname", data.nickname);
      console.log(data);
      // file 추가 해야함
      const res = await fetch(`${SERVER_URL}/users/join`, {
        method: "POST",
        body:formData,
        redirect: "follow"
      });
      console.log(res);
      if (res.status === 200) {
        const data: UserEntity = await res.json();
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async info(accessToken: string): Promise<UserEntity> {
    try {
      const res = await fetch(`${SERVER_URL}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });
      if (res.status === 200) {
        const data: UserEntity = await res.json();
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async delete(memberId: string): Promise<void> {
    await fetch(`${SERVER_URL}/users/delete/${memberId}`, {
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data"
      },
    });
  }
}

export default AuthDataSource;
