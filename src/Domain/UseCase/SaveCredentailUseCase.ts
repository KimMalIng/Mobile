import { CredentialRepository } from "@/Domain/Repository";

class SaveCredentialUseCase {
  private credentialRepository: CredentialRepository;

  constructor(cr: CredentialRepository) {
    this.credentialRepository = cr;
  }
  async execute(name: string, token: string): Promise<void> {
    try {
      await this.credentialRepository.setLocalStorage(name, token);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default SaveCredentialUseCase;
