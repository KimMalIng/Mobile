import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
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
      setEstimatedMinutes(roundedMinutes.toString());
      const hours = parseInt(estimatedHours, 10) || 0;
      const formattedTime = getFormattedTime({hours: hours, minutes: roundedMinutes});
      setEstimatedTime(formattedTime);
    }
  };

  useEffect(() => {
    console.log(`name: ${name}, label: ${selected}, startDate: ${startDate}, endDate: ${endDate}, startTime: ${startTime}, endTime: ${endTime}, shouldClear: ${shouldClear}`);
  }, [selected]); 

  useEffect(() => {
    console.log(`name: ${name}, label: ${selected}, startDate: ${startDate}, endDate: ${endDate}, estimatedTime: ${estimatedTime}`);
  }, [estimatedTime]); 

  const handleFixToggle = () => {
    setIsAdjust(current => !current);
  };

  const handleClearToggle = () => {
    setShouldClear(current => !current);
  };

  const data = [
      {key:'1', label:'학습'},
      {key:'2', label:'근무'},
      {key:'3', label:'여가'},
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>  
        <Text style={styles.headerText}>새로운 일정 등록</Text>
      </View>
      <View style={styles.content}>
        <View style={{marginBottom: '5%'}}>
          <Toggle 
            onToggle={handleFixToggle} 
            isOn={isAdjust}
            onText="자동 스케줄링" 
            offText="고정 일정" 
          />
        </View>
        <LoginInput placeholder="일정 이름" keyboardType="default" onChangeText={setName}/>    
        <View style={{flex: 0.3, marginTop:'5%'}}>
          <Text style={styles.text}>{startDate}</Text>
          <Text style={styles.text}>{startTime}</Text>
        </View>
        <View style={{flex: 1}}>
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
        <View style={{flex: 0.3}}>
          <Text style={styles.text}>{endDate}</Text>
          <Text style={styles.text}>{endTime}</Text>
        </View>
        <View style={{flex: 1}}>
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
        {isAdjust ? (
          <View style={{marginBottom: '7%', alignItems: 'center'}}>
            <View style={{marginVertical: '0.6%'}}>
              <RadioButton
                options={data}
                selectedOption={selected}
                onSelect={setSelected}
              />
            </View>
            <Text style={[styles.text, {fontSize: 17, marginTop: '1.2%'}]}>예상소요시간 입력</Text>
            <View style={{marginVertical: '1%', flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={styles.timeInput}
                placeholder="시간"
                keyboardType="numeric"
                value={estimatedHours}
                onChangeText={setEstimatedHours}
              />
              <Text>:</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="분"
                keyboardType="numeric"
                value={estimatedMinutes}
                onChangeText={handleMinutesChange}
                onBlur={handleMinutesBlur}
              />
            </View>
          </View>
        ) : (
          <View style={{marginBottom: '7%', alignItems: 'center'}}>
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
      <View style={[styles.confirm ]}>
        <Button buttonText='완료' onPress={() => isAdjust ? adjustTodo(navigation, name, selected, startDate, endDate, estimatedTime) : fixedTodo(navigation, name, selected, startDate, endDate, startTime, endTime, shouldClear)}/>
      </View>
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
