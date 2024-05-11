import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";
import { CalenderEntity } from "@/Domain/Entity";

class GetCalenderUseCase {
  private calenderReposiotry: CalenderRepository;
  private credentialRepository: CredentialRepository

  constructor(cr: CalenderRepository, cl: CredentialRepository) {
    this.calenderReposiotry = cr;
    this.credentialRepository = cl;
  }

  async execute(
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
  ): Promise<CalenderEntity> {
    // 조건
    if (
      typeof startDate !== "object" ||
      typeof endDate !== "object" 
    ) return Promise.reject(400);
    if(startDate === null || endDate === null) return Promise.reject(404);
    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      const sMonth = ((startDate.getMonth() + 1) < 10)? (`0${startDate.getMonth() + 1}`) : (`${startDate.getMonth() + 1}`)
      const eMonth = ((endDate.getMonth() + 1) < 10)? (`0${endDate.getMonth() + 1}`) : (`${endDate.getMonth() + 1}`)
      const sDay = (startDate.getDate() < 10)? (`0${startDate.getDate()}`) : (`${startDate.getDate()}`);
      const eDay = (endDate.getDate() < 10)? (`0${endDate.getDate()}`) : (`${endDate.getDate()}`);
      const s = `${startDate.getFullYear()}.${sMonth}.${sDay}`;
      const e = `${endDate.getFullYear()}.${eMonth}.${eDay}`;
      const data = await this.calenderReposiotry.getCalender(
        accessToken,
        s,
        e,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default GetCalenderUseCase;
