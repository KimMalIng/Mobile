import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL} from './const';
import {Alert} from 'react-native';

export const fixedTodo = async (
  navigation,
  todoName: string,
  todoLabel: number,
  todoStartDate: string,
  todoEndDate: string,
  todoStartTime: string,
  todoEndTime: string,
  todoShouldClear: boolean,
) => {
  try {
    const tokensString = await AsyncStorage.getItem('Tokens');
    if (!tokensString) {
      console.error('Tokens not found in AsyncStorage');
      return;
    }

    const tokens = JSON.parse(tokensString);
    const {accessToken} = tokens;

    if (!accessToken) {
      console.error('Access token not found');
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(
      `${URL}/job/save/fix`,
      {
        "name": todoName,
        "label": todoLabel,
        "startDate": todoStartDate,
        "endDate": todoEndDate,
        "startTime": todoStartTime,
        "endTime": todoEndTime,
        "shouldClear": todoShouldClear,
      },
      {headers},
    );

    if (response.status === 200) {
      Alert.alert('일정 등록 성공!');
      navigation.navigate('Main');
    }
  } catch (error) {
    Alert.alert('일정 등록 실패');
    if (error.response && error.response.status === 401) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
};

export const adjustTodo = async (
  navigation,
  todoName: string,
  todoLabel: number,
  todoStartDate: string,
  todoEndDate: string,
  todoEstimatedTime: string,
) => {
  try {
    const tokensString = await AsyncStorage.getItem('Tokens');
    if (!tokensString) {
      console.error('Tokens not found in AsyncStorage');
      return;
    }

    const tokens = JSON.parse(tokensString);
    const {accessToken} = tokens;

    if (!accessToken) {
      console.error('Access token not found');
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // 일정 저장
    const saveJobResponse = await axios.post(
      `${URL}/job/save/adjust`, 
      {
        "name": todoName,
        "label": todoLabel,
        "startDate": todoStartDate,
        "endDate": todoEndDate,
        "estimatedTime": todoEstimatedTime,
      },
      {headers},
    );

    // algorithm 가동!!!
    const adjustTimetableResponse = axios.post(
      `${URL}/timetable/adjustment`,
      {
        "startDate": todoStartDate,
        "endDate": todoEndDate,
      },
      {headers},
    );

    const responses = await Promise.all([saveJobResponse, adjustTimetableResponse]);

    if (responses[0].status === 200 && responses[1].status === 200) {
      Alert.alert('일정 등록 성공!');
      navigation.navigate('Main');
    }
  } catch (error) {
    Alert.alert('일정 등록 실패');
    console.error('API 호출 실패:', error);
  }
};

export const updateCompletion = async (
  jobId: number, 
  completion: any
) => {
  try {
    const tokensString = await AsyncStorage.getItem('Tokens');
    if (!tokensString) {
      console.error('Tokens not found in AsyncStorage');
      return;
    }

    const tokens = JSON.parse(tokensString);
    const {accessToken} = tokens;

    if (!accessToken) {
      console.error('Access token not found');
      return;
    }

    const response = await fetch(
      `${URL}/job/complete/${jobId}?completion=${completion}`, 
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    if (response.status === 200) {
      Alert.alert('완료도 조정 성공!');
      console.log('완료도 업데이트 성공');
    }
  } catch (error) {
    console.error('완료도 업데이트 실패:', error);
  }
};