import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";

class SaveFiexdCalenderUseCase {
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
    startTime: string | null | undefined,
    endTime: string | null | undefined,
    shouldClear: boolean | null | undefined,
  ){
    if(
      typeof name !== "string" ||
      typeof label !== "number" ||
      typeof startDate !== "object" ||
      typeof endDate !== "object" ||
      typeof startTime !== "string" ||
      typeof endTime !== "string" ||
      typeof shouldClear !== "boolean"
    ){
      return Promise.reject(400);
    }
    if(startDate === null || endDate === null) return Promise.reject(404);
    if(name === "") return Promise.reject(404);
    if(startTime === "" || startTime === "00:00") return Promise.reject(404);
    if(endTime === "" || endTime === "00:00") return Promise.reject(404);
    if(startTime === endTime) return Promise.reject(404);
    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      const sMonth = ((startDate.getMonth() + 1) < 10)? (`0${startDate.getMonth() + 1}`) : (`${startDate.getMonth() + 1}`)
      const eMonth = ((endDate.getMonth() + 1) < 10)? (`0${endDate.getMonth() + 1}`) : (`${endDate.getMonth() + 1}`)
      const sDay = (startDate.getDate() < 10)? (`0${startDate.getDate()}`) : (`${startDate.getDate()}`);
      const eDay = (endDate.getDate() < 10)? (`0${endDate.getDate()}`) : (`${endDate.getDate()}`);
      const s = `${startDate.getFullYear()}.${sMonth}.${sDay}`;
      const e = `${endDate.getFullYear()}.${eMonth}.${eDay}`;
      await this.calenderReposiotry.saveFixCalender(
        accessToken,
        name,
        s,
        e,
        label,
        startTime,
        endTime,
        shouldClear
      )
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default SaveFiexdCalenderUseCase;