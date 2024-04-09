import React, { useState } from 'react';
import { View, Text, PanResponder, StyleSheet, PanResponderGestureState } from 'react-native';

interface TodoProps {
  text: string;
  label: number;
}

const Todo: React.FC<TodoProps> = ({ text, label }) => {
  const [filledWidthPercentage, setFilledWidthPercentage] = useState(0);
  const [filledPercent, setFilledPercent] = useState('0'); // Initialize as a string

  const getFilledColor = (label: number): string => {
    return label === 0 ? '#A8D5FF' : label === 1 ? '#FBE299' : '#FFFFFF';
  };

  const handlePanResponderMove = (_: any, gestureState: PanResponderGestureState) => {
    const sensitivity = 0.3; // 드래그 감도 조절 (0.1부터 1까지)
    const newPercentage = Math.max(0, Math.min(Math.round((filledWidthPercentage + (gestureState.dx * sensitivity / 100)) * 10) / 10, 1)); // Snap to nearest multiple of 0.1 (10%)
    setFilledWidthPercentage(newPercentage);
    setFilledPercent(`${Math.round(newPercentage * 100)}`); // Ensure filledPercent is a string
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <>
      <View style={{ margin: '5%', width: '100%', borderWidth: 0.8, borderRadius:1,  borderColor: '#dce1d1', borderStyle: 'dashed' }} />
      <View style={styles.todo} {...panResponder.panHandlers}>
        <View style={[styles.fill, { width: `${filledWidthPercentage * 100}%`, backgroundColor: getFilledColor(label) }]} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.filledPercent}>{filledPercent}%</Text>
    </>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#FFFFFF',
    height: 65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Android shadow elevation
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#A8D5FF', // 투두 배경색
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    zIndex: 1,
  },
  filledPercent: {
    marginTop: 3,
    fontSize: 13,
    color: '#adb3a2',
  },
});

export default Todo;