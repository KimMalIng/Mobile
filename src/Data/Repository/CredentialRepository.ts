import {UserEntity} from '@/Domain/Entity';
import {CredentialRepository} from '@/Domain/Repository';
import {LocalStorageDataSource, AuthDataSource} from '@/Data/DataSource';

class CredentialRepositoryImpl implements CredentialRepository {
  async getAuthCredential(): Promise<UserEntity> {
    const token = await LocalStorageDataSource.getLocalStorage('accessToken');
    if (typeof token === 'string') {
      try {
        const data = await AuthDataSource.info(token);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(500);
  }
  async setLocalStorage(name: string, token: string): Promise<void> {
    await LocalStorageDataSource.saveLocalStorage(name, token);
  }
  async getLocalStorage(name: string): Promise<string> {
    const token = await LocalStorageDataSource.getLocalStorage(name);
    if (typeof token === 'string') return token;
    return Promise.reject(404);
  }
}

export default CredentialRepositoryImpl;
