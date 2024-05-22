import React, {useState, useEffect} from 'react';
import {Animated, Easing, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

type Props = {
  onToggle: () => void;
  isOn: boolean;
  onText: string;
  offText: string;
};

const Toggle = ({onToggle, isOn, onText, offText}: Props) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 99],
  });

  const color = isOn ? '#49A078' : '#DCE1DE';

  return (
    <TouchableOpacity onPress={onToggle} style={[styles.toggleContainer, {backgroundColor: color}]}>
      <View style={styles.toggleAndTextContainer}>
        <Animated.View
          style={[
            styles.toggleWheel,
            {
              transform: [{translateX}],
            },
          ]}
        />
        <Text style={styles.toggleText}>{isOn ? onText : offText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  toggleContainer: {
    width: 180,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  toggleAndTextContainer: {
    flexDirection: 'row', // 아이템을 가로로 배치
    justifyContent: 'center', // 가로 중앙 정렬
    alignItems: 'center', // 세로 중앙 정렬
  },
  toggleWheel: {
    width: 19,
    height: 19,
    backgroundColor: 'white',
    borderRadius: 99,
  },
  toggleText: {
    marginLeft: -10, // 토글과 텍스트 사이의 간격
    fontSize: 12,
    color: 'black',
    fontFamily: 'SeoulNamsanB'
  },
});
