import { CalenderRepository } from "@/Domain/Repository";
import { CalenderRepositoryImpl } from "@/Data/Repository";
import {
  AdjustmentCalenderUseCase,
  GetCalenderUseCase,
  SaveCalenderUseCase,
} from "@/Domain/UseCase";

class CalenderModel {
  private calenderRepository: CalenderRepository;
  private getCalenderUseCase: GetCalenderUseCase;
  private saveCalenderUseCase: SaveCalenderUseCase;
  private adjustmentCalenderUseCase: AdjustmentCalenderUseCase;

  constructor() {
    this.calenderRepository = new CalenderRepositoryImpl();
    this.getCalenderUseCase = new GetCalenderUseCase(this.calenderRepository);
    this.saveCalenderUseCase = new SaveCalenderUseCase(this.calenderRepository);
    this.adjustmentCalenderUseCase = new AdjustmentCalenderUseCase(
      this.calenderRepository,
    );
  }

  async getCalender() {
    try {
      const res = await this.getCalenderUseCase.execute(
        1,
        "2023.12.04",
        "2023.12.10",
      );
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async saveCalender(
    id: number | null | undefined,
    name: string | null | undefined,
    label: number | null | undefined,
    deadline: Date | null | undefined,
    estimatedTime: number | null | undefined,
  ): Promise<void> {
    try {
      await this.saveCalenderUseCase.execute(
        1,
        name,
        label,
        deadline,
        estimatedTime,
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async adjustmentCalender(): Promise<void> {
    try {
      await this.adjustmentCalenderUseCase.execute(
        1,
        "2023.12.04",
        "2023.12.10",
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CalenderModel;
