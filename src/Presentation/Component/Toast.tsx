import * as T from '@radix-ui/react-toast';
import { useEffect } from 'react';
import { ToastProps } from '@/Presentation/Type';
import cn from 'classnames';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import style from '@/Presentation/Style/Toast.module.css';

const Toast = ({
  iconType,
  title,
  text,
  isOpen,
  setIsOpen
}: ToastProps) => {
  useEffect(() => {
    setTimeout(() => {
      if(isOpen) setIsOpen(false);
    }, 1500);
  }, [])
  return(
    <>
      <T.Root 
        className={cn(style.ToastRoot ,{[style.fail]: (iconType === "fail"), [style.success]: (iconType === "info")})}
        open={isOpen}
      >
        <T.ToastTitle className={cn(style.ToastTitle, {[style.fail]: (iconType === "fail"), [style.success]: (iconType === "info")})}>
          {(iconType === "fail")? (
            <CrossCircledIcon
              width={24} 
              height={24}
            />
          ) : (
            <CheckCircledIcon />
          )}
          <p>{title}</p>
        </T.ToastTitle>
        <T.Description className={style.ToastDescription}>{text}</T.Description>
      </T.Root>
    </>
  );
};

export default Toast;