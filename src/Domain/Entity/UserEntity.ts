class UserEntity {
  id: string;
  imageUrl: string;
  name: string;
  nickname: string;
  loginType: string;
  accessToken: string;

  constructor(
    id: string,
    imageUrl: string,
    name: string,
    nickname: string,
    loginType: string,
    accessToken: string,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.nickname = nickname;
    this.loginType = loginType;
    this.accessToken = accessToken;
  }
}

export default UserEntity;
