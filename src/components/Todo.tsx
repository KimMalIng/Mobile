import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, PanResponderGestureState, Alert } from 'react-native';
import { updateCompletion } from '../utils/todoUtils';

interface TodoProps {
  todoData: {
    id: number;
    name: string;
    label: number;
    startTime: string;
    endTime: string;
    completion: number;
    isFixed: boolean;
    isComplete: boolean;
    isEverytime: boolean;
  };
}

const Todo: React.FC<TodoProps> = ({ todoData }) => {
  const [filledWidthPercentage, setFilledWidthPercentage] = useState(0);
  const [filledPercent, setFilledPercent] = useState('0');
  const [initialFilledWidthPercentage, setInitialFilledWidthPercentage] = useState(0);

  const getFilledColor = (label: number): string => {
    if (label === 1) {
      return '#A8D5FF';
    } else if (label === 2) {
      return '#FBB4C1';
    } else if (label === 3 || label === 0) {
      return '#B7E6B6';
    } else {
      return '#DCE1DE';
    }
  };

  const calculateFilledWidth = (completion: number): number => {
    return completion / 100;
  };

  useEffect(() => {
    const initialWidth = calculateFilledWidth(todoData.completion);
    setFilledWidthPercentage(initialWidth);
    setInitialFilledWidthPercentage(initialWidth);
  }, [todoData.completion]);

  useEffect(() => {
    const newPercentage = Math.round(filledWidthPercentage * 100);
    setFilledPercent(`${newPercentage}`);
  }, [filledWidthPercentage]);

  const handlePanResponderMove = (_: any, gestureState: PanResponderGestureState) => {
    if (todoData.isFixed) return; // Do nothing if the todo is fixed
    const sensitivity = 0.3;
    const newPercentage = Math.max(0, Math.min(Math.round((filledWidthPercentage + (gestureState.dx * sensitivity / 100)) * 10) / 10, 1));
    setFilledWidthPercentage(newPercentage);
    setFilledPercent(`${Math.round(newPercentage * 100)}`);
  };

  const handlePanResponderRelease = () => {
    if (todoData.isFixed) return; // Do nothing if the todo is fixed

    Alert.alert(
      '완료도를 저장하시겠습니까?',
      '',
      [
        {
          text: '아니오',
          onPress: () => {
            setFilledWidthPercentage(initialFilledWidthPercentage);
            setFilledPercent(`${Math.round(initialFilledWidthPercentage * 100)}`);
          },
          style: 'cancel',
        },
        {
          text: '예',
          onPress: () => {
            updateCompletion(todoData.id, filledPercent);
            console.log(`id: ${todoData.id}, 완료도 저장: ${filledPercent}`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <>
      <View style={styles.dottedLine} />
      { todoData.isEverytime ?
        <View style={styles.todoContainer}>
          <Text style={styles.completionText}>{todoData.name}</Text>
          <View style={[styles.fill, { width: `${filledWidthPercentage * 100}%`, backgroundColor: getFilledColor(todoData.label) }]} />
        </View>
        :
        (todoData.isFixed ?
          <View style={styles.todoContainer}>
            <Text style={styles.completionText}>{todoData.name}</Text>
            <View style={[styles.fill, { width: `${filledWidthPercentage * 100}%`, backgroundColor: getFilledColor(todoData.label) }]} />
            <Text style={[styles.completionText, {fontSize: 13, fontWeight: '400'}]}>고정 일정</Text>
          </View>
          :
          <View style={styles.todoContainer} {...(!todoData.isFixed && panResponder.panHandlers)}>
            <Text style={styles.completionText}>{todoData.name}</Text>
            <View style={[styles.fill, { width: `${filledWidthPercentage * 100}%`, backgroundColor: getFilledColor(todoData.label) }]} />
            <Text style={[styles.completionText, {fontSize: 13, fontWeight: '400'}]}>전체 완료도 {filledPercent}%</Text>
          </View>
        )
      }
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{todoData.startTime}</Text>
        <Text style={styles.timeText}>{todoData.endTime}</Text>
      </View>
    </>
  );
  
};

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#A8D5FF',
  },
  completionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    zIndex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
  },
  timeText: {
    fontSize: 12,
    fontFamily: "SeoulNamsanB",
    color: '#000000',
  },
  dottedLine: {
    margin: '5%',
    width: '100%',
    borderWidth: 0.8,
    borderRadius: 1,
    borderColor: '#dce1d1',
    borderStyle: 'dashed'
  }
});

export default Todo;
