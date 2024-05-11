import { UserEntity } from "@/Domain/Entity";

interface UserRepository {
  info(token: string): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}

export default UserRepository;
