import { HashLoader } from 'react-spinners';
import { createPortal } from 'react-dom';

import style from '@/Presentation/Style/Spinner.module.css';

const Spinner = () => {
  const print = () => {
    const portal = document.getElementById("portal");
    console.log(portal);
    if(portal === null) return <></>;
    return createPortal(<>
        <div className={style.Spinner}>
          <HashLoader
            color='#36d7b7'
            size='85'
          />
        </div>,
    </>, portal);
  }
  
  return (
    <>
      {print()}
    </>
  );
}

export default Spinner;