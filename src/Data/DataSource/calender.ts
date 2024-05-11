import { SERVER_URL } from "@/Const";
import { CalenderData } from "@/Data/Model";
import { CalenderEntity } from "@/Domain/Entity";
class CalenderDataSource {
  static async getCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<CalenderEntity> {
    try {
      console.log(`/timetable/period?startDate=${startDate}&endDate=${endDate}`);
      const res = await fetch(`${SERVER_URL}/timetable/period?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log(res.status)
      if (res.status === 200) {
        const r = await res.json();
        const data: CalenderEntity = r;
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }
  static async saveCalender(
    accessToken: string,
    name: string,
    label: number,
    startDate: string,
    endDate: string,
    estimatedTime: string,
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/job/save/adjust`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "name": name,
          "label": label,
          "startDate": startDate,
          "endDate": endDate,
          "estimatedTime": estimatedTime

        }),
      });
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async saveFiexdCalender(
    accessToken: string,
    name: string,
    label: number,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    shouldClear: boolean
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/job/save/fix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "name": name,
          "label": label,
          "startDate": startDate,
          "endDate": endDate,
          "startTime": startTime,
          "endTime": endTime,
          "shouldClear": shouldClear
  
        })
      });
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
        return Promise.reject(500);
    }
    
  }
  static async adjustmentCalender(
    id: number,
    startDate: string,
    endDate: string,
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/timetable/adjustment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
          startDate,
          endDate,
        }),
      });
      console.log(res);
      if (res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }
}

export default CalenderDataSource;
