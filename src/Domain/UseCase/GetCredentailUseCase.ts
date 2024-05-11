import { AuthRepository } from "@/Domain/Repository";

class GetCredentailUseCase {
  private authRepository: AuthRepository;

  constructor(at: AuthRepository) {
    this.authRepository = at;
  }
  async execute(): Promise<boolean> {
    try {
      const data = await this.authRepository.getCredential();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default GetCredentailUseCase;
