import { CalenderRepository } from "@/Domain/Repository";

class AdjustmentCalenderUseCase {
  private calenderReposiotry: CalenderRepository;

  constructor(cr: CalenderRepository) {
    this.calenderReposiotry = cr;
  }

  async execute(
    // 리턴값이 무조건 promise 처리가 됨, 그래서 await 쓸 수 있음
    id: number | null | undefined,
    startDate: string | null | undefined,
    endDate: string | null | undefined,
  ): Promise<void> {
    if (
      typeof id === "undefined" ||
      typeof startDate === "undefined" ||
      typeof endDate === "undefined" ||
      id === null ||
      startDate === null ||
      endDate === null
    ) {
      return Promise.reject(400);
    }
    try {
      await this.calenderReposiotry.adjustmentCalender(id, startDate, endDate);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AdjustmentCalenderUseCase;
