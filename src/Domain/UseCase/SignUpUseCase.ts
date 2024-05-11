import { AuthRepository } from "@/Domain/Repository";

type UserDataType = {
  id: string | null | undefined;
  imageUrl: string | null | undefined;
  name: string | null | undefined;
  nickname: string | null | undefined;
  password: string | null | undefined;
};

class SignUpUseCase {
  private authRepository: AuthRepository;

  constructor(ar: AuthRepository) {
    this.authRepository = ar;
  }

  async execute({
    id,
    imageUrl,
    name,
    nickname,
    password,
  }: UserDataType) {
    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof nickname !== "string" ||
      typeof password !== "string" ||
      typeof imageUrl !== "string"
    ) {
      return Promise.reject(400);
    }
    try {
      const data = await this.authRepository.signUp({
        id,
        imageUrl,
        name,
        nickname,
        password,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default SignUpUseCase;
