import { CalenderEntity } from "@/Domain/Entity";
import { CalenderRepository } from "@/Domain/Repository";
import { CalenderDataSource } from "@/Data/DataSource";

class CalenderRepositoryImpl implements CalenderRepository {
  async saveFixCalender(accessToken: string, name: string, startDate: string, endDate: string, label: number, startTime: string, endTime: string, shouldClear: boolean): Promise<void> {
    try {
      await CalenderDataSource.saveFiexdCalender(accessToken, name, label, startDate, endDate, startTime, endTime, shouldClear);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async saveCalender(accessToken: string, name: string, startDate: string, endDate: string, label: number, estimatedTime: string): Promise<void> {
    try {
      await CalenderDataSource.saveCalender(accessToken, name, label, startDate, endDate, estimatedTime);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async adjustmentCalender(
    id: number,
    startDate: string,
    endDate: string,
  ): Promise<void> {
    try {
      await CalenderDataSource.adjustmentCalender(id, startDate, endDate);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<CalenderEntity> {
    try {
      const data: CalenderEntity = await CalenderDataSource.getCalender(
        accessToken,
        startDate,
        endDate,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CalenderRepositoryImpl;
