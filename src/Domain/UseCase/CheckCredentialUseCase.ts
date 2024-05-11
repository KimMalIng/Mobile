import { CredentialRepository } from "@/Domain/Repository";
import { UserEntity } from "../Entity";

class CheckCredentialUseCase {
  private credentialRepository: CredentialRepository;

  constructor(cr: CredentialRepository) {
    this.credentialRepository = cr;
  }
  async execute(): Promise<UserEntity>{
    try {
      const info = this.credentialRepository.getAuthCredential();
      return info;

    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CheckCredentialUseCase;