import { UserEntity } from "@/Domain/Entity";

interface CredentialRepository {
  getAuthCredential(): Promise<UserEntity>;
  setLocalStorage(name: string, token: string): Promise<void>;
  getLocalStorage(name: string): Promise<string>;
}

export default CredentialRepository;