import { MouseEventHandler, useState } from 'react';
import cn from 'classnames';
import * as D from '@radix-ui/react-dialog';
import { DialogProps } from '@/Presentation/Type';

import style from '@/Presentation/Style/Dialog.module.css';

const Dialog = ({
  dialogChildren,
}: DialogProps) => {

  return(
    <D.Root open>
      <D.Portal>
        <D.Overlay className={style.DialogOverlay}></D.Overlay>
        <D.Content className={style.DialogContent}>
          {dialogChildren}
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}

export default Dialog;