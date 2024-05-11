import { CalenderEntity } from "@/Domain/Entity";

interface CalenderRepository {
  getCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<CalenderEntity>;
  saveCalender(
    accessToken: string,
    name: string,
    startDate: string,
    endDate: string,
    label: number,
    estimatedTime: string,
  ): Promise<void>;
  saveFixCalender(
    accessToken: string,
    name: string,
    startDate: string,
    endDate: string,
    label: number,
    startTime: string,
    endTime: string,
    shouldClear: boolean,
  ): Promise<void>;
  adjustmentCalender(
    id: number,
    startDate: string,
    endDate: string,
  ): Promise<void>;
}

export default CalenderRepository;
