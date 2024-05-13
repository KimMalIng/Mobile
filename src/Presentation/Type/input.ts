import { ChangeEventHandler } from "react";

type InputProps = {
  width: string;
  height: string;
  text: string;
  placeHolder: string;
  fontSize: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type { InputProps };
