import {SERVER_URL} from '@/Const';
import {AuthEntity, UserEntity} from '@/Domain/Entity';
import {AuthRepository} from '@/Domain/Repository';
import {AuthDataSource} from '@/Data/DataSource';

class AuthRepositoryImpl implements AuthRepository {
  async delete(id: string): Promise<void> {
    await AuthDataSource.delete(id);
  }
  async signUp(data: AuthEntity): Promise<UserEntity> {
    try {
      const res = await AuthDataSource.signup(data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async login(id: string, password: string): Promise<UserEntity> {
    try {
      const res = await AuthDataSource.login(id, password);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  logout(): Promise<void> {
    return new Promise(resolve => {
      localStorage.removeItem('auth');
    });
  }
  oauth(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default AuthRepositoryImpl;
