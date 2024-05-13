type ToastProps = {
  iconType: "info" | "fail";
  title: string;
  text: string;
  isOpen: boolean;
  setIsOpen:(open: boolean) => void
}

export type { ToastProps };