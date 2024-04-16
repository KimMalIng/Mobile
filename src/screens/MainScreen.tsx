import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Todo from '../components/Todo';

const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

const MainScreen = () => {
  const [date, setDate] = useState(new Date());
  // 임시 데이터
  const todoDataList = [
    { id: 1, name: '회화레슨', label: 3, startTime: '07:00', endTime: '09:00', completion: 100, isFixed: false, isComplete: false },
    { id: 2, name: '캡스톤디자인', label: 1, startTime: '09:00', endTime: '11:00', completion: 40, isFixed: false, isComplete: false },
    { id: 3, name: '도서 반납', label: 0, startTime: '11:00', endTime: '14:00', completion: 100, isFixed: true, isComplete: true },
    { id: 4, name: '아르바이트', label: 2, startTime: '16:00', endTime: '19:00', completion: 100, isFixed: true, isComplete: false },
    { id: 5, name: '단어 암기', label: 1, startTime: '22:00', endTime: '23:00', completion: 80, isFixed: false, isComplete: false },
    { id: 6, name: '수영', label: 0, startTime: '22:00', endTime: '23:00', completion: 100, isFixed: true, isComplete: false },
    { id: 7, name: '수영', label: 0, startTime: '22:00', endTime: '23:00', completion: 100, isFixed: true, isComplete: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getFormattedDate(date)}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} contentOffset={{x:0, y:0}}>
        <View style={styles.todoContainer}>
          {todoDataList.map(todoData => (
            <Todo key={todoData.id} todoData={todoData} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: '#9CC5A1',
    height: '14%',
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
    height:'75%',
    // backgroundColor: "#293df1"
  },
  todoContainer: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
  },
});

export default MainScreen;
