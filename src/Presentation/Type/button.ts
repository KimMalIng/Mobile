import path from "path";
import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  height: string;
  width: string;
  fontSize: string;
  backgroundColor: string;
  color: string;
  children: string | ReactNode;
  imgsrc: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type { ButtonProps };
