import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// RadioButton 컴포넌트
const RadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View>
      {options.map((item) => (
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => onSelect(item.key)} // item의 key 값만 onSelect 함수에 전달
          key={item.key}
        >
          <View style={styles.radioButton}>
            {selectedOption === item.key && <View style={styles.radioButtonIcon} />}
          </View>
          <Text style={styles.radioButtonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    radioButton: {
      height: 20,
      width: 20,
      backgroundColor: '#F8F8F8',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E6E6E6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioButtonIcon: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#216869',
    },
    radioButtonText: {
      marginLeft: 16,
      fontSize: 16,
      color: '#1f2421',
      fontFamily: 'SeoulNamsanB'
    },
});

export default RadioButton;