class AuthEntity {
  id: string;
  imageUrl: string;
  name: string;
  nickname: string;
  password: string;

  constructor(
    id: string,
    imageUrl: string,
    name: string,
    nickname: string,
    password: string,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
  }
}

export default AuthEntity;
