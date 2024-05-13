import { ChangeEventHandler, MouseEventHandler } from "react";

type TodoProps = {
  key: number;
  label: number;
  startTime: string;
  endTime: string;
  name: string;
  todoType: string;
  checked: boolean | undefined;
  prevValue: number | undefined;
};

export type { TodoProps };
