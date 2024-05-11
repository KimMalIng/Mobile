import { AuthEntity, UserEntity } from "@/Domain/Entity";

interface AuthRepository {
  signUp(data: AuthEntity): Promise<UserEntity>;
  login(id: string, password: string): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  logout(): Promise<void>;
  oauth(): Promise<void>;
}

export default AuthRepository;
