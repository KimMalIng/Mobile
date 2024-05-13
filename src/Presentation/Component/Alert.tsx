import * as AlertDialog from '@radix-ui/react-alert-dialog';
import cn from 'classnames';
import { AlertProps } from '@/Presentation/Type';

import style from '@/Presentation/Style/Alert.module.css';
import '@fontsource/inter';

const Alert = ({
  text,
  title,
  alertOnClose,
  buttonOnClick
}: AlertProps) => {
  return(
    <AlertDialog.Root open={true}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={style.AlertDialogOverlay} />
        <AlertDialog.Content className={style.AlertDialogContent}>
          <AlertDialog.Title className={style.AlertDialogTitle}>{title}</AlertDialog.Title>
          <AlertDialog.Description className={style.AlertDialogDescription}>
            {text}
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className={cn(style.Button, style.mauve)} onClick={alertOnClose}>닫기</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className={cn(style.Button, style.red)} onClick={buttonOnClick}>삭제하기</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Alert;