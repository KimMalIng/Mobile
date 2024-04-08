import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomStatusBarProps {
  backgroundColor: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  // add more props as needed for StatusBar
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({ backgroundColor, barStyle = 'dark-content' }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  );
};

export default CustomStatusBar;
