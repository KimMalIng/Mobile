import React, { MouseEventHandler, useState, ChangeEventHandler, useEffect } from "react";
import { NewTaskProps } from '@/Presentation/Type';
import cn from 'classnames';
import * as Switch from '@radix-ui/react-switch';
import { Toast, Spinner } from "@/Presentation/Component";
import { SaveCalenderUseCase, SaveFiexdCalenderUseCase, AdjustmentCalenderUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from '@/Data/Repository';
import { useRouter } from "next/router";

import "react-datepicker/dist/react-datepicker.css";
import style from "@/Presentation/Style/NewTask.module.css";
import st from '@/Presentation/Style/Select.module.css';

const NewTask = ({ startDate, endDate, handleSaveNewTask }: NewTaskProps) => {
  const saveCalenderUseCase = new SaveCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const saveFiexdCalenderUseCase = new SaveFiexdCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const adjustmentCalenderUseCase = new AdjustmentCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const router = useRouter();
  const [taskName, setTaskName] = useState("");
  const [isAuto, setIsAuto] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isRequestErrorToastOpen, setIsRequestErrorToastOpen] = useState(false);
  const [isSuccessToastOpen, setIsSucessToastOpen] = useState(false);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const [selectLable, setSelectLabel] = useState("일반")
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");

  const handleTaskName: ChangeEventHandler<HTMLInputElement> = (e) => { 
    setTaskName(e.target.value); 
  };
  const handleIsAuto = (checked: boolean) => {
    setIsAuto(checked);
    setIsToastOpen(false);
    setStartHour("00");
    setStartMinute("00");
    setEndHour("00");
    setEndMinute("00");
  }
  const handleIsClear = (checked: boolean) => {
    if(isAuto){
      setIsToastOpen(true);
      return;
    }
    setIsClear(checked);
    if(checked){
      setEndHour("24");
      setEndMinute("00");
    }
    else {
      setEndHour("00");
      setEndMinute("00");
    }
  }
  const handleStartHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    if(isNaN(Number(e.target.value))) return;
    if(Number(e.target.value) < 10) {
      const n = Number(e.target.value);
      setStartHour('');
      setStartHour(`0${n}`)
    }
    else setStartHour(String(Number(e.target.value)));
  }
  const handleStartMinute: ChangeEventHandler<HTMLInputElement> = (e) => {
    if(isNaN(Number(e.target.value))) return;
    if(isNaN(Number(startMinute))) return;
    if(Number(e.target.value) < Number(startMinute)){
      if(Number(e.target.value) < 0) return;
      setStartMinute(`${Math.floor(Number(e.target.value) / 10) * 10}`)
    }
    else {
      if(Number(e.target.value) > 50) return;
      setStartMinute(`${Math.ceil(Number(e.target.value) / 10) * 10}`)
    }
  }
  const handleEndHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    if(isClear) return;
    if(isNaN(Number(e.target.value))) return;
    if(Number(e.target.value) < 10) {
      const n = Number(e.target.value);
      setEndHour('');
      setEndHour(`0${n}`)
    }
    else setEndHour(String(Number(e.target.value)));
  }
  const handleEndMinute: ChangeEventHandler<HTMLInputElement> = (e) => {
    if(isClear) return;
    if(isNaN(Number(e.target.value))) return;
    if(isNaN(Number(endMinute))) return;
    if(Number(e.target.value) < Number(endMinute)){
      if(Number(e.target.value) < 0) return;
      setEndMinute(`${Math.floor(Number(e.target.value) / 10) * 10}`)
    }
    else {
      if(Number(e.target.value) > 50) return;
      setEndMinute(`${Math.ceil(Number(e.target.value) / 10) * 10}`)
    }
  }

  const setToastOpen = (open: boolean) => {
    setIsToastOpen(open);
  }
  
  const setRequestErrorToastOpen = (open: boolean) => {
    setRequestErrorToastOpen(open);
  }
  const handleLabelSelected = (text: "학업" | "일반" | "업무") => {
    setSelectLabel(text);
  }
  const translateSelected = (): number => {
    console.log(selectLable);
    if(selectLable === "학업") return 3;
    if(selectLable === "업무") return 2;
    return 1;
  }
  const handleSaveButtonClick: MouseEventHandler<HTMLDivElement> = async (event) => {
    try {
      const e = (endDate === null)? (startDate) : (endDate);
      console.log(e);
      if(isAuto) {
        await saveCalenderUseCase.execute(
          taskName,
          translateSelected(),
          startDate,
          e,
          `${startHour}:${startMinute}`
        );
      }
      else {
        await saveFiexdCalenderUseCase.execute(
          taskName,
          translateSelected(),
          startDate,
          e,
          `${startHour}:${startMinute}`,
          `${endHour}:${endMinute}`,
          isClear
        )
      }
      setIsSucessToastOpen(true);
      setIsSpinnerOpen(true);
      await adjustmentCalenderUseCase.execute(startDate, e);
      setTimeout(() => {
        setIsSpinnerOpen(false);
        handleSaveNewTask();
      }, 500)
      router.reload();
    } catch (error) {
      console.log(error);
      if(!isRequestErrorToastOpen) setIsRequestErrorToastOpen(true);
    }
  };

  useEffect(() => {
    if(Number(startHour) > Number(endHour)){
      setEndHour(startHour);
      if(Number(startMinute) > Number(endMinute)) setEndMinute(startMinute);
    }
  }, [startHour]);

  useEffect(() => {
    if(Number(startMinute) > Number(endMinute)) setEndMinute(startMinute);
  }, [startMinute]);

  return (
    <>
      {(isSpinnerOpen)? (<Spinner />) : (<></>)}
      <div className={style.NewTask}>
        <Toast
          iconType="info"
          title="성공"
          text="일정이 저장되었습니다"
          isOpen={isSuccessToastOpen}
          setIsOpen={setIsSucessToastOpen}
        />
        <Toast
          iconType="fail"
          title="실패"
          text="자동 스케쥴링에서는 사용할 수 없습니다"
          isOpen={isToastOpen}
          setIsOpen={setToastOpen}
        />
        <Toast
          iconType="fail"
          title="실패"
          text="정보를 정확히 입력해주세요"
          isOpen={isRequestErrorToastOpen}
          setIsOpen={setRequestErrorToastOpen}
        />
        <input 
            type="text"
            value={taskName}
            onChange={handleTaskName}
            className={style.TaskNameInput}
            placeholder="일정 이름을 입력해주세요"
          />
        <div className={style.LabelBox}>
          <div 
            className={cn(style.SelectLabel, {[style.Select]: (selectLable === "학업")})}
            onClick={() => handleLabelSelected("학업")}
          >
            학업
          </div>
          <div 
            className={cn(style.SelectLabel, {[style.Select]: (selectLable === "업무")})}
            onClick={() => handleLabelSelected("업무")}
          >
            업무
          </div>
          <div 
            className={cn(style.SelectLabel, {[style.Select]: (selectLable === "일반")})}
            onClick={() => handleLabelSelected("일반")}
          >
            일반
          </div>
        </div>

        <div className={style.SwitchBox}>
          <p className={style.SwitchText}>자동 스케쥴링</p>
          <Switch.Root 
            className={style.SwitchRoot}
            checked={isAuto}
            onCheckedChange={handleIsAuto}
          >
            <Switch.Thumb className={style.SwitchThumb} />
          </Switch.Root>
        </div>

        <div className={style.SwitchBox}>
          <p className={style.SwitchText}>이후 일정 비우기</p>
          <Switch.Root 
            className={style.SwitchRoot}
            checked={isClear}
            onCheckedChange={handleIsClear}
          >
            <Switch.Thumb className={style.SwitchThumb} />
          </Switch.Root>
        </div>

        <div className={style.TimeBox}>
          {(isAuto)? (
            <>
              <h2 className={style.TimeBoxTitle}>필요시간 지정하기</h2>
              <p className={style.TimeBoxSubTitle}>일정은 주간에 자동 배치됩니다</p>
              <div className={style.NumberInputBox}>
                <input 
                  type="number" 
                  value={startHour}
                  onChange={handleStartHour}
                  className={style.NumberInput}
                />
                <h2 className={style.NumberInputSlice}> : </h2>
                <input
                  type="number" 
                  value={startMinute}
                  onKeyDown={() => false}
                  onKeyUp={() => false}
                  onChange={handleStartMinute}
                  className={style.NumberInput}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className={style.TimeBoxTitle}>시작시간 지정하기</h2>
              <div className={style.NumberInputBox}>
                <input 
                  type="number" 
                  value={startHour}
                  onChange={handleStartHour}
                  className={style.NumberInput}
                />
                <h2 className={style.NumberInputSlice}> : </h2>
                <input
                  type="number" 
                  value={startMinute}
                  onKeyDown={() => false}
                  onKeyUp={() => false}
                  onChange={handleStartMinute}
                  className={style.NumberInput}
                />
              </div>
              <h2 className={style.TimeBoxTitle}>종료시간 지정하기</h2>
              <div className={style.NumberInputBox}>
                <input 
                  type="number" 
                  value={endHour}
                  onChange={handleEndHour}
                  className={style.NumberInput}
                />
                <h2 className={style.NumberInputSlice}> : </h2>
                <input
                  type="number" 
                  value={endMinute}
                  onKeyDown={() => false}
                  onKeyUp={() => false}
                  onChange={handleEndMinute}
                  className={style.NumberInput}
                />
              </div>
    
            </>
          )}
          <div className={style.btnBox}>
            <div 
              className={cn(style.btn, style.save)}
              onClick={handleSaveButtonClick}
            >
              저장하기
            </div>
          </div>
        </div>
          {/* <div className={style.toggles_times}>
            <div className={style.toggles}>
              <span>일정 설정</span>
              <label className={style.toggle_switch}>
                <input type="checkbox" onChange={toggleHandler} checked={autoSchedule} />
                <span className={style.slider}>{autoSchedule ? "자동 스케줄링" : "고정일정 입력"}</span>
              </label>
              {autoSchedule && <p>⬆️ 버튼을 눌러 알바, 약속<br />등 고정 일정 추가하기 !</p>}
              {!autoSchedule &&
                <label className={style.toggle_switch}>
                  <input type="checkbox" onChange={toggleClear} checked={shouldClear} />
                  <span className={style.slider}>{shouldClear ? "이후 일정 비움" : "일과 정상 진행"}</span>
                </label>
              }
              {!autoSchedule && !shouldClear && <p>⬆️ 버튼을 눌러 이후 일정<br></br>마감하기 (술 약속 등등)</p>}

            </div>
            {autoSchedule ? <div className={style.ExpectTime}>
              <div className={style.TimeSetter}>
                <TimeInput setExpectTime={handleExpectTime} />
              </div>
            </div>
              : <div className={style.ExpectTime}>
                <div className={style.TimeSetter}>
                  <PeriodInput />
                </div>
              </div>
            }
          </div> */}
      </div>
    </>
  );
};
export default NewTask;
