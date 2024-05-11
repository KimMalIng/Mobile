import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, PanResponderGestureState } from 'react-native';

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
  };
}

const Todo: React.FC<TodoProps> = ({ todoData }) => {
  const [filledWidthPercentage, setFilledWidthPercentage] = useState(0);
  const [filledPercent, setFilledPercent] = useState('0');

  const getFilledColor = (label: number): string => {
    if (label === 1) {
      return '#A8D5FF';
    } else if (label === 2) {
      return '#FBB4C1';
    } else if (label === 3) {
      return '#B7E6B6';
    } else {
      return '#DCE1DE';
    }
  };

  const calculateFilledWidth = (completion: number): number => {
    return completion / 100;
  };

  useEffect(() => {
    setFilledWidthPercentage(calculateFilledWidth(todoData.completion));
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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <>
      <View style={styles.dottedLine} />
      <View style={styles.todoContainer} {...(!todoData.isFixed && panResponder.panHandlers)}>
        <Text style={styles.completionText}>{todoData.name}</Text>
        <View style={[styles.fill, { width: `${filledWidthPercentage * 100}%`, backgroundColor: getFilledColor(todoData.label) }]} />
        {!todoData.isFixed && <Text style={styles.completionText}>{filledPercent}%</Text>}
      </View>
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
    // paddingHorizontal: 10,
    marginTop: 5,
    width: '100%', // Added to ensure full width
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
