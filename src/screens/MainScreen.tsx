import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Todo from '../components/Todo';
import { GetCalenderUseCase } from '../Domain/UseCase';
import { CalenderRepositoryImpl, CredentialRepositoryImpl } from "../Data/Repository";
import { CalenderEntity } from "../Domain/Entity";

const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

const MainScreen = () => {
  const getCalenderUseCase = new GetCalenderUseCase(new CalenderRepositoryImpl(), new CredentialRepositoryImpl());
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateList, setDateList] = useState<DateListType>({});
  const [isSortFinish, setIsSortFinish] = useState(false);
  const [isDateListLoading, setIsDateListLoading] = useState(true);

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

  useEffect(() => {
    setIsDateListLoading(true);
    getList();
  }, [startDate, endDate]);

  useEffect(() => {
    if(isSortFinish) return;
  }, [isSortFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getFormattedDate(date)}</Text>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewContent} contentOffset={{x:0, y:0}}>
        <View style={styles.todoContainer}>
            {dateList.map((todoData) => (
              <Todo key={todoData.id} todoData={todoData} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: '#9CC5A1',
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 21,
    marginTop: 50,
  },
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
  },
  todoContainer: {
    width: '90%',
    alignItems: 'center',
  },
});

export default MainScreen;
