import { AuthRepository } from "@/Domain/Repository";
import { UserEntity } from "@/Domain/Entity";

class LoginUseCase {
  private authRepository: AuthRepository;
  constructor(ar: AuthRepository) {
    this.authRepository = ar;
  }

  async execute(
    id: string | null | undefined,
    password: string | null | undefined,
  ): Promise<UserEntity> {
    if (
      typeof id === "undefined" ||
      typeof password === "undefined" ||
      id === null ||
      password === null
    ) {
      return Promise.reject(400);
    }
    try {
      const data = await this.authRepository.login(id, password);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default LoginUseCase;
