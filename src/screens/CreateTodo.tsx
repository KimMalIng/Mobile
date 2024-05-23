import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert } from 'react-native';
import LoginInput from '../components/LoginInput';
import DatePicker from 'react-native-date-picker';
import Button from '../components/LoginButton';
import { SelectList } from 'react-native-dropdown-select-list'
import RadioButton from '../components/RadioButton';
import Toggle from '../components/Toggle';
import { fixedTodo } from '../utils/todoUtils';
import { adjustTodo } from '../utils/todoUtils';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  CreateTodo: undefined;
  Tab: undefined;
};

type CreateTodoNavigationProp = StackNavigationProp<RootStackParamList, 'CreateTodo'>;

interface CreateTodoProps {
  navigation: CreateTodoNavigationProp;
}

const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

function getFormattedTime(input) {
  let hours, minutes;

  if (input instanceof Date) {
    hours = input.getHours();
    minutes = input.getMinutes();
  } else if (typeof input === 'object' && input.hours !== undefined && input.minutes !== undefined) {
    hours = input.hours;
    minutes = input.minutes;
  } else {
    throw new Error('Invalid input');
  }

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  return `${formattedHours}:${formattedMinutes}`;
}

const CreateTodo = ({ navigation }: CreateTodoProps) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [shouldClear, setShouldClear] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [sdate, setSDate] = useState(new Date());
  const [edate, setEDate] = useState(new Date());
  const [selected, setSelected] = useState(0);
  const [isAdjust, setIsAdjust] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');

  // TextInput에 포커스가 있는지 추적하기 위한 상태 추가
  const [isFocused, setIsFocused] = useState(false);
  // TextInput 컴포넌트에 추가할 onFocus 핸들러
  const handleFocus = () => setIsFocused(true);
  // TextInput 컴포넌트에 추가할 onBlur 핸들러
  const handleBlur = () => setIsFocused(false);


  const handleHoursChange = (input) => {
    let hours = input;
    // 입력값이 비어있지 않고 한 자리 수일 경우에만 선행하는 '0'을 추가
    if (hours.length === 1 && hours !== '') {
      hours = `0${hours}`;
    } else if (hours.length > 2) {
      // 입력값의 길이가 2보다 큰 경우, 입력값의 처음 2자리만 사용
      // '008' 같은 입력을 방지하기 위함
      hours = hours.substring(0, 2);
    }
    setEstimatedHours(hours);
  };
  
  const handleMinutesChange = (input) => {
    setEstimatedMinutes(input);
  };

  const handleMinutesBlur = () => {
    let minutes = parseInt(estimatedMinutes, 10);
    if (isNaN(minutes)) {
      setEstimatedMinutes('');
    } else {
      // 10분 단위로 반올림
      const roundedMinutes = Math.round(minutes / 10) * 10;
      // 0을 '00'으로 변경, 10 미만 숫자는 선행하는 0을 추가하여 문자열로 변환
      let minutesStr = roundedMinutes === 0 ? '00' : (roundedMinutes < 10 ? '0' + roundedMinutes.toString() : roundedMinutes.toString());
  
      setEstimatedMinutes(minutesStr);
  
      const hours = parseInt(estimatedHours, 10) || 0;
      const formattedTime = getFormattedTime({hours: hours, minutes: roundedMinutes});
      setEstimatedTime(formattedTime);
    }
  };

  const handleFixToggle = () => {
    setIsAdjust(current => !current);
  };

  const handleClearToggle = () => {
    setShouldClear(current => !current);
  };

  const data = [
      {key:'3', label:'학업'},
      {key:'2', label:'업무'},
      {key:'1', label:'일반'},
  ]

  const handleCompletion = () => {
    if (isAdjust) {
      adjustTodo(
        navigation,
        name,
        selected,
        startDate,
        endDate,
        estimatedTime
      );
      console.log(
        name,
        selected,
        startDate,
        endDate,
        estimatedTime
      );
    } else {
      fixedTodo(
        navigation,
        name,
        selected,
        startDate,
        endDate,
        startTime,
        endTime,
        shouldClear
      );
      console.log(
        name,
        selected,
        startDate,
        endDate,
        startTime,
        endTime,
        shouldClear);
    }

    // 모든 input 상태 초기화
    // setName('');
    // setStartDate('');
    // setEndDate('');
    // setStartTime('');
    // setEndTime('');
    // setShouldClear(false);
    // setSDate(new Date());
    // setEDate(new Date());
    // setSelected(0);
    // setIsAdjust(false);
    // setEstimatedTime('');
    // setEstimatedHours('');
    // setEstimatedMinutes('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>새로운 일정 등록</Text>
      </View>
      <View style={styles.content}>
        <View style={{ marginBottom: '5%' }}>
          <Toggle
            onToggle={handleFixToggle}
            isOn={isAdjust}
            onText="자동 스케줄링"
            offText="고정 일정"
          />
        </View>
        <TextInput 
        style={styles.input} 
        textAlign="center" 
        placeholder="일정 이름" 
        keyboardType="default" 
        onChangeText={setName} 
        value={name}
        />
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              {!isFocused && (
                <>
                  <View style={{ flex: 0.3, marginTop: '5%', alignItems: 'center' }}>
                    <Text style={styles.text}>{startDate}</Text>
                    <Text style={styles.text}>{startTime}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button style={styles.button} buttonText="시작 시간 선택" onPress={() => setStartOpen(true)} />
                    <DatePicker
                      modal
                      open={startOpen}
                      date={sdate}
                      onConfirm={(sdate) => {
                        setStartOpen(false);
                        setSDate(sdate);
                        setStartDate(getDateString(sdate));
                        const formattedTime = getFormattedTime(sdate); // 시간 포매팅 함수 사용
                        setStartTime(formattedTime);
                      }}
                      onCancel={() => {
                        setStartOpen(false);
                      }}
                    />
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'center' }}>
                    <Text style={styles.text}>{endDate}</Text>
                    <Text style={styles.text}>{endTime}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button style={styles.button} buttonText="종료 시간 선택" onPress={() => setEndOpen(true)} />
                    <DatePicker
                      modal
                      open={endOpen}
                      date={edate}
                      onConfirm={(edate) => {
                        if (edate <= sdate) {
                          // 종료 시간이 시작 시간보다 같거나 이르면 경고 표시
                          Alert.alert("오류", "종료 시간은 시작 시간보다 늦어야 합니다.");
                          setEndOpen(false);
                        } else {
                          // 유효한 시간 범위인 경우 상태 업데이트
                          setEndOpen(false);
                          setEDate(edate);
                          setEndDate(getDateString(edate));
                          const formattedTime = getFormattedTime(edate); // 시간 포매팅 함수 사용
                          setEndTime(formattedTime);
                        }
                      }}
                      onCancel={() => {
                        setEndOpen(false);
                      }}
                    />
                  </View>
                </>
              )}
              {isAdjust ? (
                <View style={{ marginBottom: '7%', alignItems: 'center' }}>
                  {!isFocused && (
                    <View style={{ marginVertical: '0.6%' }}>
                      <RadioButton
                        options={data}
                        selectedOption={selected}
                        onSelect={setSelected}
                      />
                    </View>
                  )}
                  <Text style={[styles.text, { fontSize: 17, marginTop: '1.2%' }]}>예상소요시간 입력</Text>
                  <View style={{ marginVertical: '1%', flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="시간"
                      keyboardType="numeric"
                      value={estimatedHours}
                      onChangeText={handleHoursChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <Text>:</Text>
                    <TextInput
                      style={styles.timeInput}
                      placeholder="분"
                      keyboardType="numeric"
                      value={estimatedMinutes}
                      onChangeText={handleMinutesChange}
                      onFocus={handleFocus}
                      onBlur={() => {
                        handleMinutesBlur(); // 첫 번째 함수 호출
                        handleBlur();        // 두 번째 함수 호출
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View style={{ marginBottom: '7%', alignItems: 'center' }}>
                  <RadioButton
                    options={data}
                    selectedOption={selected}
                    onSelect={setSelected}
                  />
                  <View style={{ marginTop: '7%' }}>
                    <Toggle
                      onToggle={handleClearToggle}
                      isOn={shouldClear}
                      onText="이후 일정 비우기"
                      offText="비우지 않기"
                    />
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.confirm}>
        <Button
          buttonText="완료"
          onPress={handleCompletion}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: '#DCE1DE',
    height: 45,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomColor: '#216869',
    borderBottomWidth: 2,
    color: '#255D51',
    fontFamily: 'SeoulNamsanB',
    fontSize: 16,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: '#9CC5A1',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 21,
    marginTop: 50,
    color: "#1F2421"
  },
  content: {
    alignItems: 'center',
    marginTop: '7%',
    height: '70%'
  },
  button: {
    marginTop: '5%',
  },
  confirm: {
    alignItems: 'center'
  },
  text: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 15,
    padding: 0
  },
  dropdown: {
    position: 'absolute', // 절대 위치 설정
    top: 50, // 필요에 따라 조정
    left: 0,
    right: 0,
    elevation: 3
  },
  timeInput: {
    height: 30,
    fontSize: 20
  }
});


export default CreateTodo;
