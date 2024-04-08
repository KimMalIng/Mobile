import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dash, { DashProps } from 'react-native-dash';

const DottedLine = () => {
  const dashProps: DashProps = {
    dashLength: 10, // Length of each dash
    dashThickness: 1, // Thickness of each dash
    dashGap: 7, // Gap between dashes
    dashColor: '#dce1d1', // Color of dashes
    style: { width: '100%', height: 0, marginVertical: '3%' }, // Adjusted margin style
  };

  return <Dash {...dashProps} />;
};

export default DottedLine;
