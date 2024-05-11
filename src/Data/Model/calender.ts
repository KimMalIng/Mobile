type SubjectType = {
  date: string;
  deadline: string;
  endTime: string;
  estimatedTime: number;
  label: number;
  name: string;
  startTime: string;
};

type CalenderData = {
  day: string;
  subject: SubjectType[];
};

export type { CalenderData, SubjectType };
