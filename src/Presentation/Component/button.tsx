import { ButtonProps } from "@/Presentation/Type";
import style from "@/Presentation/Style/Button.module.css";

const Button = ({
  width,
  height,
  fontSize,
  backgroundColor,
  color,
  children,
  imgsrc,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={style.Button}
      style={{
        width,
        height,
        fontSize,
        backgroundColor,
        color,
      }}
      onClick={onClick}
    >
      <img src={imgsrc} alt="" />
      {children}
    </button>
  );
};

export default Button;
