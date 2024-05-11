import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import MypageScreen from '../screens/MypageScreen';
import { View, Text, TouchableOpacity } from 'react-native';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', paddingVertical: '8%', backgroundColor: '#F3F3F3' }}
          >
            <Text style={{ color: isFocused ? '#49a078' : '#1f2421', textAlign: 'center', fontFamily: 'SeoulNamsanB', fontSize: 17 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
      <Tab.Navigator 
      screenOptions={{
        headerShown: false
      }} 
      tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name='홈' component={MainScreen}/>
        <Tab.Screen name='마이페이지' component={MypageScreen}/>
      </Tab.Navigator>
  );
};

export default TabNavigation;
