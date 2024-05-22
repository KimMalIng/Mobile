import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Todo from '../components/Todo';
import TapNavigation from '../navigation/TapNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../utils/const';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CreateTodo: undefined;
  MainScreen: undefined;
};

interface MainScreenProps {
  navigation: NavigationProp<RootStackParamList, 'MainScreen'>;
}

const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

const getCurrentDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const MainScreen = ({ navigation }: MainScreenProps) => {
  const [date, setDate] = useState(new Date());
  const [todoInfo, setTodoInfo] = useState();
  const currentDate = getCurrentDate(date);

  useEffect(() => {
    getTodoInfo();
  }, [date]);

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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handlePrevDay = () => {
    const prevDay = new Date(date.getTime());
    prevDay.setDate(prevDay.getDate() - 1);
    setDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
  };

  const handleTodo = () => {
    navigation.navigate("CreateTodo");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>  
        <TouchableOpacity style={styles.button} onPress={handlePrevDay}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerText} onPress={handleTodo}>{getFormattedDate(date)}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNextDay}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewContent} contentOffset={{x:0, y:0}}>
        <View style={styles.todoContainer}>
        {todoInfo && (
          <>
            {[...todoInfo.EveryTimeJob, ...todoInfo.SeperatedJob, ...todoInfo.FixedJob]
              .sort((a, b) => {
                // a와 b의 startTime을 '시'와 '분'으로 분리하여 숫자로 변환
                const [aHours, aMinutes] = a.startTime.split(':').map(Number);
                const [bHours, bMinutes] = b.startTime.split(':').map(Number);
                // '시'를 '분'으로 환산하여 총 분으로 계산
                const aTotalMinutes = aHours * 60 + aMinutes;
                const bTotalMinutes = bHours * 60 + bMinutes;
                // 총 분을 기준으로 비교
                return aTotalMinutes - bTotalMinutes;
              })
              .map((todoData) => (
                <Todo
                  key={todoData.id}
                  todoData={{
                    ...todoData,
                    // FixedJob와 EveryTimeJob에 대해 isFixed와 completion을 설정
                    isFixed: todoData.isFixed || todoInfo.FixedJob.some(job => job.id === todoData.id) || todoInfo.EveryTimeJob.some(job => job.id === todoData.id),
                    completion: todoData.completion || (todoInfo.FixedJob.some(job => job.id === todoData.id) || todoInfo.EveryTimeJob.some(job => job.id === todoData.id) ? 100 : todoData.completion),
                  }}
                />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 이 부분 수정
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 21,
    marginTop: 50,
    color: "#1F2421"
  },
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
  },
  todoContainer: {
    width: '90%',
    alignItems: 'center',
  },
  button: {
    marginTop: 40,
  },
  arrowText: {
    fontSize: 24,
    marginHorizontal: 20,
    color: "#1F2421"
  },
});


export default MainScreen;
