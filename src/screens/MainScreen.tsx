import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Todo from '../components/Todo';
import TapNavigation from '../navigation/TapNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../utils/const';

const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const MainScreen = () => {
  const [date, setDate] = useState(new Date());
  const [todoInfo, setTodoInfo] = useState();
  const currentDate = getCurrentDate();

  useEffect(() => {
    getTodoInfo();
  }, []);

  const getTodoInfo = async () => {
    try {
      const tokensString = await AsyncStorage.getItem("Tokens");
      if (!tokensString) {
        console.error("Tokens not found in AsyncStorage");
        return;
      }
  
      const tokens = JSON.parse(tokensString);
      const { accessToken, refreshToken } = tokens;
  
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `refreshToken=${refreshToken}`
      };
  
      const response = await axios.get(`${URL}/timetable/period?startDate=${currentDate}&endDate=${currentDate}`, { headers });
      setTodoInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getFormattedDate(date)}</Text>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewContent} contentOffset={{x:0, y:0}}>
        <View style={styles.todoContainer}>
        {todoInfo && (
          <>
            {todoInfo.EveryTimeJob.map((todoData) => (
              <Todo key={todoData.id} todoData={todoData} />
            ))}
            {todoInfo.SeperatedJob.map((todoData) => (
              <Todo key={todoData.id} todoData={todoData} />
            ))}
            {todoInfo.FixedJob.map((todoData) => (
              <Todo key={todoData.id} todoData={todoData} />
            ))}
          </>
        )}
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
