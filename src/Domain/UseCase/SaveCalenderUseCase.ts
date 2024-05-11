import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";

class SaveCalenderUseCase {
  private calenderReposiotry: CalenderRepository;
  private credentialRepository: CredentialRepository;

  constructor(cr: CalenderRepository, cl: CredentialRepository) {
    this.calenderReposiotry = cr;
    this.credentialRepository = cl;
  }

  async execute(
    name: string | null | undefined,
    label: number | null | undefined,
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    estimatedTime: string | null | undefined,
  ): Promise<void> {
    if(
      typeof name !== "string" ||
      typeof label !== "number" ||
      typeof startDate !== "object" ||
      typeof endDate !== "object" ||
      typeof estimatedTime !== "string"
    ){
      return Promise.reject(400);
    }
    if(startDate === null || endDate === null) return Promise.reject(404);
    if(name === "") return Promise.reject(404);
    if(estimatedTime === "" || estimatedTime === "00:00") return Promise.reject(404);

    // 조건
    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      const sMonth = ((startDate.getMonth() + 1) < 10)? (`0${startDate.getMonth() + 1}`) : (`${startDate.getMonth() + 1}`)
      const eMonth = ((endDate.getMonth() + 1) < 10)? (`0${endDate.getMonth() + 1}`) : (`${endDate.getMonth() + 1}`)
      const sDay = (startDate.getDate() < 10)? (`0${startDate.getDate()}`) : (`${startDate.getDate()}`);
      const eDay = (endDate.getDate() < 10)? (`0${endDate.getDate()}`) : (`${endDate.getDate()}`);
      const s = `${startDate.getFullYear()}.${sMonth}.${sDay}`;
      const e = `${endDate.getFullYear()}.${eMonth}.${eDay}`;
      await this.calenderReposiotry.saveCalender(
        accessToken,
        name,
        s,
        e,
        label,
        estimatedTime
      )
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default SaveCalenderUseCase;
