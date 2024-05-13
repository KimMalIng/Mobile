import React, { useEffect, useState, MouseEventHandler, MouseEvent, ReactNode } from 'react';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";
import { GetCalenderUseCase } from '@/Domain/UseCase';
import { CalenderEntity } from "@/Domain/Entity";
import { Calendar } from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { Dialog } from '@/Presentation/Component';
import NewTask from './newTask';
import { MonthCalenderProps, MonthCalenderLabelType } from '@/Presentation/Type';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as D from '@radix-ui/react-dialog';
import cn from 'classnames';

import ct from '@/Presentation/Style/ContextMenu.module.css';
import 'react-calendar/dist/Calendar.css';
import style from "@/Presentation/Style/customCalendar.module.css";
import main from "@/Presentation/Style/Main.module.css";
import { PlusIcon, MinusIcon, Cross1Icon } from '@radix-ui/react-icons';


const MonthlyCalendar = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: MonthCalenderProps) => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [calenderValue, setCalenderValue] = useState<Value>(new Date());
  const [month, setMonth] = useState<Date>(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`));
  const [data, setData] = useState<CalenderEntity>();

  const getList = async () => {
    const e = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 2}-1`);
    const endDate = new Date(e.setDate(e.getDate() - 1));
    try {
      const data = await getCalenderUseCase.execute(month, endDate);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddSchedule: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDialogOpen(true);
    console.log(calenderValue);
  }
  const handleAddScheduleClose: MouseEventHandler<SVGAElement> = (e) => {
    setIsDialogOpen(false);
  }
  const handleSaveNewTask = (): void => {
    setIsDialogOpen(false);
  }
  const handleCalenderValue = (value: Value, e: MouseEvent<HTMLButtonElement>) => {
    if(value === null) return;
    console.log(value);
    if(Array.isArray(value)){
      if(value[0] !== null) setStartDate(value[0]);
      if(value[1] !== null) setEndDate(value[1]);

    }
    else{
      setStartDate(value);
      setEndDate(null);
    }
  }

  const filterValue = (): string => {
    if(endDate === null){
      return `
        ${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}에 일정 등록하기
      `;
    }
    else if(
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate() 
    ){
      return `
      ${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}에 일정 등록하기
    `;
    }
    else {
      return `
      ${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} ~ 
      ${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}에 일정 등록하기
    `;
    }
  }

  const isHaveLabel = (d: Date): ReactNode => {
    let label: MonthCalenderLabelType = {
      firstLabel: false,
      secondLabel: false,
      thirdLabel: false
    };
    if(typeof data === "undefined" || data === null) return <></>;

    const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
    const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
    const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;
    data.EveryTimeJob.map((c) => {
      const day = d.getDay();
      if((c.dayOfTheWeek + 1) === day){
        if(c.label === 0) label.thirdLabel = true;
        if(c.label === 1) label.firstLabel = true;
        if(c.label === 2) label.secondLabel = true;
        if(c.label === 3) label.thirdLabel = true;
      }
    });
    data.SeperatedJob.map((c) => {
      if(dateKey === c.day){
        if(c.label === 0) label.thirdLabel = true;
        if(c.label === 1) label.firstLabel = true;
        if(c.label === 2) label.secondLabel = true;
        if(c.label === 3) label.thirdLabel = true;
      }
    })
    data.FixedJob.map((c) => {
      const dateKeyToDate = new Date(`${dateKey.split(".")[0]}-${dateKey.split(".")[1]}-${dateKey.split(".")[2]}`);
      const cStartDateToDate = new Date(`${c.startDate.split(".")[0]}-${c.startDate.split(".")[1]}-${c.startDate.split(".")[2]}`);
      const deadline = (c.deadline === null)? c.startDate : c.deadline;
      const cEndDateToDate = new Date(`${deadline.split(".")[0]}-${deadline.split(".")[1]}-${deadline.split(".")[2]}`);
      if(dateKeyToDate >= cStartDateToDate && dateKeyToDate <= cEndDateToDate){
        if(c.label === 0) label.thirdLabel = true;
        if(c.label === 1) label.firstLabel = true;
        if(c.label === 2) label.secondLabel = true;
        if(c.label === 3) label.thirdLabel = true;
      }
    })

    const firstString = (label.firstLabel) ? (main.label1) : (style.None);
    const secondString = (label.secondLabel) ? (main.label2) : (style.None);
    const thirdString = (label.thirdLabel) ? (main.label3) : (style.None);
    
    return (
      <div className={style.CalenderLabelBox}>
        <div className={cn(style.CalenderLabel, firstString)}></div>
        <div className={cn(style.CalenderLabel, secondString)}></div>
        <div className={cn(style.CalenderLabel, thirdString)}></div>
      </div>
    );
  }
  
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {(isDialogOpen)?(
        <Dialog 
          dialogChildren={
            <div>
              <div
                className={style.DialogTitle}
              >
                {filterValue()}
                <D.DialogClose>
                  <Cross1Icon 
                    onClick={handleAddScheduleClose}
                  />
                </D.DialogClose>
              </div>
              <NewTask
                startDate={startDate}
                endDate={endDate}
                handleSaveNewTask={handleSaveNewTask}
              />
            </div>
          }
        />
      ) : (<></>)}
      <Calendar
        locale="en"
        allowPartialRange={true}
        className={style.MonthCalendar}
        next2Label={null}
        prev2Label={null}
        returnValue="range"
        selectRange={true}
        onChange={handleCalenderValue}
        tileContent={({ date }) => {
          return (
              <ContextMenu.Root>
                <ContextMenu.Trigger
                   className={ct.ContextMenuTrigger}
                >
                  <div className={cn(style.NoScheduleDayTile)}>
                    {isHaveLabel(date)}
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Content
                    className={ct.ContextMenuContent}
                  >
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                      onClick={handleAddSchedule}
                    >
                      일정 추가하기
                      <div className={ct.RightSlot}>
                        <PlusIcon />
                      </div>
                    </ContextMenu.Item>
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                    >
                      일정 삭제하기
                      <div className={ct.RightSlot}>
                        <MinusIcon />
                      </div>
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
              </ContextMenu.Root>

          );
        }}
      />
    </>
  );
};
export default MonthlyCalendar;