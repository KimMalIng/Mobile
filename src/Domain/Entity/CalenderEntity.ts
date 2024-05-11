

type EveryTimeType = {
  id: number;
  name: string;
  label: number;
  startTime: string;
  endTime: string;
  estimatedTime: string;
  dayOfTheWeek: number;
  fixed: boolean;
  complete: boolean;
}

type SeperatedJobType = {
  id: number;
  name: string;
  label: number;
  day: string;
  startTime: string;
  endTime: string;
  estimatedTime: string;
  deadline: string | null;
  completion: number;
  fixed: boolean;
  complete: boolean;
}

type FixedJobType = {
  id: number;
  name: string;
  label: number;
  startTime: string;
  endTime: string;
  estimatedTime: string;
  startDate: string;
  deadline: string | null;
  shouldClear: boolean;
  fixed: boolean;
  complete: boolean;
}

class CalenderEntity {
  EveryTimeJob: EveryTimeType[];
  SeperatedJob: SeperatedJobType[];
  FixedJob: FixedJobType[];

  constructor(e: EveryTimeType[], s: SeperatedJobType[], f: FixedJobType[]) {
    this.EveryTimeJob = e;
    this.SeperatedJob = s;
    this.FixedJob = f;
  }
}

export default CalenderEntity;
