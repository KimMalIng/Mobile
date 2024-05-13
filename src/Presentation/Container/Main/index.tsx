import {
  useState,
  useRef,
  useEffect,
  MouseEventHandler,
  ReactNode,
} from "react";
import {
  Alert, Header, Dialog, Toast
} from "@/Presentation/Component";
import { GetCalenderUseCase, DeleteCalenderUseCase, CompleteCalenderUseCase } from '@/Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "@/Data/Repository";
import { CalenderEntity } from "@/Domain/Entity";
import { DateListType, DateType } from '@/Presentation/Type';
import MontlyCalendar from './customCalendar';
import Skeleton from 'react-loading-skeleton'
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Progress from '@radix-ui/react-progress';
import cn from 'classnames';
import { PlusIcon, MinusIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Week from "./Week";

import style from "@/Presentation/Style/Main.module.css";
import "react-calendar/dist/Calendar.css";
import 'react-loading-skeleton/dist/skeleton.css';
import '@fontsource/inter';
import ct from '@/Presentation/Style/ContextMenu.module.css';
import pg from '@/Presentation/Style/Progress.module.css';

const Main = () => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const deleteCalenderUseCase = new DeleteCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const completeCalenderUseCase = new CompleteCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [weekEndDate, setWeekEndDate] = useState(new Date());
  const [dateList, setDateList] = useState<DateListType>({});
  const [id, setId] = useState(-1);
  const [isSortFinish, setIsSortFinish] = useState(false);
  const [isDateListLoading, setIsDateListLoading] = useState(true);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [isCompleteToastOpen, setIsCompleteToastOpen] = useState(false);
  const [isErrorCompleteToastOpen, setIsErrorCompleteToastOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlert = (b: boolean) => {
    setIsAlertOpen(b);
  }

  const handleAlerteDeleteClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      if(id === -1) return;
      await deleteCalenderUseCase.execute(id);
      setIsToastOpen(true);
    } catch (error) {
      setIsErrorToastOpen(true);
    }
    handleAlert(false);
  }

  const handleCompleteClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    try {
      if(id === -1) return;
      await completeCalenderUseCase.execute(id);
      setIsCompleteToastOpen(true);
    } catch (error) {
      console.log(error);
      setIsErrorCompleteToastOpen(true);
    }
  }

  const handleWeeklyLeftButton: MouseEventHandler<SVGAElement> = () => {

  }

  const sortCalenderList = async (d: Date, calender: CalenderEntity | null | undefined): Promise<void> => {
    const dateSaveList: DateType[] = [];
    if(calender === null || typeof calender === "undefined") return Promise.reject(404);
    const end = (endDate === null) ? startDate : endDate;
    if(d <= end){
     
      const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
      const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
      const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;
      await Promise.all(
        calender.EveryTimeJob.map((c) => {
          const day = d.getDay();
          if((c.dayOfTheWeek + 1) === day){
            const saveDate: DateType = {
              id: c.id,
              label: c.label,
              name: c.name,
              startTime: c.startTime,
              endTime: c.endTime,
              fixed: true,
              complete: c.complete,
              estimatedTime: c.estimatedTime
            }
         
            dateSaveList.push(saveDate);
          }
        })
      );
      await Promise.all(
        calender.SeperatedJob.map((c) => {
          if(dateKey === c.day){
            const saveDate: DateType = {
              id: c.id,
              label: c.label,
              name: c.name,
              startTime: c.startTime,
              endTime: c.endTime,
              fixed: c.fixed,
              complete: c.complete,
              estimatedTime: c.estimatedTime
            }
            dateSaveList.push(saveDate);
          }
        })
      );
      await Promise.all(
        calender.FixedJob.map((c) => {
          const dateKeyToDate = new Date(`${dateKey.split(".")[0]}-${dateKey.split(".")[1]}-${dateKey.split(".")[2]}`);
          const cStartDateToDate = new Date(`${c.startDate.split(".")[0]}-${c.startDate.split(".")[1]}-${c.startDate.split(".")[2]}`);
          const deadline = (c.deadline === null)? c.startDate : c.deadline;
          const cEndDateToDate = new Date(`${deadline.split(".")[0]}-${deadline.split(".")[1]}-${deadline.split(".")[2]}`);
          if(dateKeyToDate >= cStartDateToDate && dateKeyToDate <= cEndDateToDate){
            const saveDate: DateType = {
              id: c.id,
              label: c.label,
              name: c.name,
              startTime: c.startTime,
              endTime: c.endTime,
              fixed: true,
              complete: c.complete,
              estimatedTime: c.estimatedTime
            }
            dateSaveList.push(saveDate);
          }
        })
      );
        const sortDateList = dateSaveList.sort((a, b) => {
          const aTime = (Number(a.startTime.split(":")[0]) * 60) + (Number(a.startTime.split(":")[1]));
          const bTime = (Number(b.startTime.split(":")[0]) * 60) + (Number(b.startTime.split(":")[1]));
          return aTime - bTime;
        });
      setDateList({
        ...dateList,
        [dateKey]: sortDateList
      })
      // dateSaveList.current.splice(0, dateSaveList.current.length);
      const nextDate = new Date(d);
      await sortCalenderList(new Date(nextDate.setDate(nextDate.getDate() + 1)), calender);
    }
    else {
      setIsSortFinish(true);
      setTimeout(() => {
        setIsDateListLoading(false);
      }, 1000)
    }
  }
  const getList = async () => {
    const e = (endDate === null)? (startDate) : (endDate);
    try {
      const data = await getCalenderUseCase.execute(startDate, e);
      setDateList({});
      sortCalenderList(startDate, data);
    } catch (error) {
      console.log(error);
    }
  }
  const setLabel = (l: number): string => {
    if(l === 1) return style.label1;
    if(l === 2) return style.label2;
    return style.label3;
  }
  const printCalender = (d: Date): ReactNode => {
    if(isDateListLoading) return <></>
    const end = (endDate === null) ? startDate : endDate;
    if(d <= end){
      const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
      const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
      const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;

      const nextDate = new Date(d);
      const returnComponent = printCalender(new Date(nextDate.setDate(nextDate.getDate() + 1)));
      if(typeof dateList[dateKey] === "undefined"){
        return (
          <>
            <h2 className={style.WeeklyListTitle}>{dateKey}</h2>
            {returnComponent}
          </>
        );
      }
      return (
        <>
          <div className={style.WeeklyListBox}>
            <h2 className={style.WeeklyListTitle}>{dateKey}</h2>
          </div>
          <div className={style.WeeklyListItemBox}>
          {
            dateList[dateKey].map((d, i) => {
              return (
                <div 
                  className={cn(
                    style.WeeklyListItem,
                  )}
                  key={i}
                >
                  <p className={style.WeeklyStartTime}>{d.startTime}</p>
                  <ContextMenu.Root>
                    <ContextMenu.Trigger
                      className={ct.ContextMenuTrigger}
                    >
                      <div className={cn(style.WeeklyItem, setLabel(d.label))}>
                        <h2 className={style.WeeklyItemTitle}>
                          {d.name}
                          {(d.complete)? (
                            <CheckIcon />
                          ) : (
                            <></>
                          )}  
                        </h2>
                      </div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Portal>
                  <ContextMenu.Content
                    className={ct.ContextMenuContent}
                  >
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                      onClick={
                        (e) => {
                          console.log(d.id);
                          setId(d.id);
                          handleCompleteClick(e);
                        }
                      }
                    >
                      일정 완료하기
                      <div className={ct.RightSlot}>
                        <PlusIcon />
                      </div>
                    </ContextMenu.Item>
                    <ContextMenu.Item
                      className={ct.ContextMenuItem}
                      onClick={()=> {
                        setId(d.id);
                        handleAlert(true);
                      }}
                    >
                      일정 삭제하기
                      <div className={ct.RightSlot}>
                        <MinusIcon />
                      </div>
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
                  </ContextMenu.Root>
                </div>
              );
            })
          }
          </div>
          {returnComponent}
        </>
      );
    }
    else{
      return <></>;
    }
  }
 
  const printDateToString = (d: Date) => {
    const dayMonthKey = (d.getMonth() + 1 < 10)? `0${(d.getMonth() + 1)}`: `${(d.getMonth() + 1)}`;
    const dayDatekey = (d.getDate() < 10)? `0${d.getDate()}` : `${d.getDate()}`;
    const dateKey = `${d.getFullYear()}.${dayMonthKey}.${dayDatekey}`;
    return dateKey;
  }

  useEffect(() => {
    setIsDateListLoading(true);
    getList();
  }, [startDate, endDate]);

  useEffect(() => {
    if(isSortFinish) return;
  }, [isSortFinish]);

  useEffect(() => {
    const startWeek = new Date((new Date().setDate(new Date().getDate() - new Date().getDay())));
    const endWeek = new Date((new Date().setDate(new Date().getDate() + 6 - new Date().getDay())));
    setWeekStartDate(startWeek);
    setWeekEndDate(endWeek);
  }, []);
  return (
    <>
      <Toast 
        iconType="info"
        title="성공"
        text="일정 삭제에 성공했습니다"
        isOpen={isToastOpen}
        setIsOpen={setIsToastOpen}
      />
      <Toast 
        iconType="info"
        title="성공"
        text="일정 완료에 성공했습니다"
        isOpen={isCompleteToastOpen}
        setIsOpen={setIsCompleteToastOpen}
      />
      <Toast 
        iconType="fail"
        title="실패"
        text="일정 삭제에 실패했습니다"
        isOpen={isErrorToastOpen}
        setIsOpen={setIsErrorToastOpen}
      />
      <Toast 
        iconType="fail"
        title="실패"
        text="일정 완료에 실패했습니다"
        isOpen={isErrorCompleteToastOpen}
        setIsOpen={setIsErrorCompleteToastOpen}
      />
      <div className={style.Main}>
        <Header />
        {(isAlertOpen)? 
          (
            <Alert 
              title={"일정을 삭제하시겠습니까?"}
              text={"삭제 후 일정은 복구 불가능합니다"}
              alertOnClose={() => handleAlert(false)}
              buttonOnClick={handleAlerteDeleteClick}
            />
          ) : (
            <></>
          )}
        <div className={style.MonthandDay}>
          <div className={style.ContentBox}>
            <h2 className={style.ContentTitle}>일정 목록</h2>
            {(isDateListLoading)? (
                  <>
                    <Skeleton 
                      className={style.SkeletonTitle} 
                      height={30}
                    />
                    <div className={style.SkeletonBox}>
                      <Skeleton height={88}/>
                      <Skeleton height={44}/>
                      <Skeleton height={88}/>
                      <Skeleton height={44}/>
                      <Skeleton height={88}/>
                      <Skeleton height={44}/>
                      <Skeleton height={88}/>
                    </div>
                  </>
            ) : (
              printCalender(startDate)
            )}
          </div>
          <div className={style.CalenderBox}>
              <MontlyCalendar
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
          </div>
        </div>
      </div>
      <div className={style.Weekly}>
        <div className={style.WeeklyBox}>
          <h2 className={style.WeeklyTitle}>
            주간일정 {`${printDateToString(weekStartDate)} ~ ${printDateToString(weekEndDate)}`}
          </h2>

          <div className={style.WeekCalender}>
            <div className={style.WeekMoveBox}>
              <ChevronLeftIcon 
                width={24}
                height={24}
              />

              <div className={style.WeekExplainBox}>
                <div className={style.WeekExplain}>
                  <div className={cn(style.WeekExplainIcon, style.label1)}></div>
                  <h2>일반</h2>
                </div>
                <div className={style.WeekExplain}>
                  <div className={cn(style.WeekExplainIcon, style.label2)}></div>
                  <h2>업무</h2>
                </div>
                <div className={style.WeekExplain}>
                  <div className={cn(style.WeekExplainIcon, style.label3)}></div>
                  <h2>학업</h2>
                </div>
              </div>

              <ChevronRightIcon 
                width={24}
                height={24}
              />
            </div>
            <div className={style.WeekContentBox}>
              <div className={cn(style.WeekBox)}>
                <div className={style.WeekContent}></div>
                <div className={style.WeekContent}>일</div>
                <div className={style.WeekContent}>월</div>
                <div className={style.WeekContent}>화</div>
                <div className={style.WeekContent}>수</div>
                <div className={style.WeekContent}>목</div>
                <div className={style.WeekContent}>금</div>
                <div className={style.WeekContent}>토</div>
              </div>
              <Week 
                startDate={weekStartDate}
                endDate={weekEndDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
