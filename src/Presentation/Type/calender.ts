import { CalenderEntity } from "@/Domain/Entity";
import { Dispatch } from "react";

type CalenderProps = {
  data: CalenderEntity[];
  updateNowDate: (n: number) => void;
};

type SetLabelColor = {
  [key: string]: string;
};

type NewTaskProps = {
  startDate: Date;
  endDate: Date | null;
  handleSaveNewTask: () => void;
}

type MonthCalenderProps = {
  startDate: Date;
  endDate: Date | null;
  setEndDate: Dispatch<React.SetStateAction<Date | null>>
  setStartDate: Dispatch<React.SetStateAction<Date>>
}

type DateType = {
  id: number;
  label: number;
  name: string;
  startTime: string;
  endTime: string;
  estimatedTime: string;
  fixed: boolean;
  complete: boolean;  
}

type DateListType = {
  [key: string]: DateType[];
}

type MonthCalenderLabelType = {
  firstLabel: boolean; // label 1
  secondLabel: boolean; // label 2
  thirdLabel: boolean;
}

export type { CalenderProps, SetLabelColor , NewTaskProps, MonthCalenderProps, DateListType, DateType, MonthCalenderLabelType};
