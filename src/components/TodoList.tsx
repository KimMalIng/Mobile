import React, { useState, useEffect } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';
import Todo from './Todo';
import CustomStatusBar from './CustomStatusBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const getFormattedDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

const TodoList: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState<string[]>([]);
  const [swipeHandled, setSwipeHandled] = useState(false);

  const generateExampleTodos = (newDate: Date) => {
    const exampleTodos = Array.from(
      { length: 6 },
      (_, index) => `${getFormattedDate(newDate)} ${index + 1}번째 Todo`
    );
    setTodos(exampleTodos);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!swipeHandled) {
      const newDate = new Date(date);
      if (direction === 'right') {
        newDate.setDate(newDate.getDate() - 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      setDate(newDate);
      setSwipeHandled(true);
      generateExampleTodos(newDate);
    }
  };

  useEffect(() => {
    generateExampleTodos(date); // Generate initial todos
  }, []); // Empty dependency array to run once on mount

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (!swipeHandled) {
        if (gestureState.dx < -50) {
          handleSwipe('left');
        } else if (gestureState.dx > 50) {
          handleSwipe('right');
        }
      }
    },
    onPanResponderRelease: () => {
      setSwipeHandled(false);
    },
  });

  return (
    <SafeAreaProvider>
      <CustomStatusBar backgroundColor="#9CC5A1" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.dateText}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.todoContainer} {...panResponder.panHandlers}>
          {/* Render todo components with example data */}
          {todos.map((todo, index) => (
            <Todo key={index} text={todo} label={index % 3} />
          ))}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9CC5A1',
    borderBottomWidth: 2,
    borderBottomColor: '#dce1d1',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoContainer: {
    flex: 1,
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
  },
});

export default TodoList;