import { ReactNode, MouseEventHandler } from "react"
type AlertProps = {
  text: string;
  title: string;
  alertOnClose: MouseEventHandler<HTMLButtonElement>;
  buttonOnClick: MouseEventHandler<HTMLButtonElement>;
}

export type { AlertProps };