import { TodoProps } from "@/Presentation/Type";
import style from "@/Presentation/Style/Todo.module.css";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

const Todo = ({
  label,
  name,
  todoType,
  prevValue,
  checked,
  startTime,
  endTime,
}: TodoProps) => {
  const calculateFillPercentage = () => {
    if (sliderValue !== undefined) {
      return (sliderValue / 100) * 100;
    }
  };
  const [sliderValue, setSliderValue] = useState(prevValue);
  const handleSliderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
  };
  // isTodoCheck ===true, make toggle button
  const [isDone, setIsDone] = useState(checked);
  const handleDone: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsDone(e.target.checked);
  };

  const setLabelColor = (label: number): string => {
    if (label === 1) return "#BBF7BA";
    if (label === 2) return "#A8D5FF";
    if (label === 3) return "#FFD4C1";
    if (label === 4) return "#FBE299";
    if (label === 5) return "#FF94A7";
    return "#fff";
  };

  return (
    <div className={style.TodoBox}>
      <label className={style.TimeTable}>
        <p>{startTime}</p>
        <p>{endTime}</p>
      </label>
      <div className={style.TodoContainer}>
        <div
          className={style.ColorLabel}
          style={{ backgroundColor: setLabelColor(label + 1) }}
        ></div>
        <div
          className={
            sliderValue === 100 || isDone ? style.DoneTodoBody : style.TodoBody
          }
        >
          {todoType === "fixed" ? (
            <div className={style.TodoFixed}>
              <p>{name}</p>
            </div>
          ) : todoType === "check" ? (
            <div className={style.TodoCheck}>
              <label className={style.CheckboxLabel}>
                <input id="checkbox" type="checkbox" onChange={handleDone} />
                <span
                  className={style.CheckboxCustom}
                  style={{
                    border: isDone ? "none" : "1px solid rgb(234, 234, 234)",
                  }}
                ></span>
              </label>
              <p>{name}</p>
            </div>
          ) : (
            <div className={style.TodoProgress}>
              <p>{name}</p>
              <input
                className={style.ProgressBar}
                type="range"
                min={0}
                max={100}
                step={10}
                value={sliderValue}
                onChange={handleSliderChange}
                style={{
                  background: `linear-gradient(to right, #49A078 0%, #49A078 ${calculateFillPercentage()}%, #ecf0f1 ${calculateFillPercentage()}%, #ecf0f1 100%)`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
