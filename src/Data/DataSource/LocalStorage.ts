class LocalStorageDataSource {
  static getLocalStorage(name: string): Promise<string | null> {
    return new Promise((resolve) => {
      const token = localStorage.getItem(name);
      resolve(token);
    });
  }
  static saveLocalStorage(name: string, token: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(name, token);
      resolve();
    });
  }
}

export default LocalStorageDataSource;
