import { AuthRepository } from "@/Domain/Repository";
import { AuthRepositoryImpl } from "@/Data/Repository";
import { SignUpUseCase } from "@/Domain/UseCase";

class AuthModel {
  private authRepository: AuthRepository;
  private signUpUseCase: SignUpUseCase;
  constructor() {
    this.authRepository = new AuthRepositoryImpl();
    this.signUpUseCase = new SignUpUseCase(this.authRepository);
  }

  async signUp() {
    try {
      const res = await this.signUpUseCase.execute({
        id: "test12345",
        imageUrl: "",
        password: "test123",
        major: "컴퓨터공학부",
        university: "인천대학교",
        nickname: "test12345",
        name: "이장훈",
      });
      console.log(res);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthModel;
