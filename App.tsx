import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import Splash from './src/screens/Splash';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TabNavigation from './src/navigation/TapNavigation';
import UserInfoScreen from './src/screens/UserInfoScreen';
import CreateTodo from './src/screens/CreateTodo';
import messaging from '@react-native-firebase/messaging';
import MainScreen from './src/screens/MainScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
  //   if (enabled) {
  //     return getToken();
  //   }
  // };

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(remoteMessage)   
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간
  });

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('디바이스 토큰값');
    console.log(fcmToken);
    // dispatch(set_deviceToken(fcmToken));
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="SplashScreen" component={Splash} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
        <Stack.Screen name="CreateTodo" component={CreateTodo} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Tab" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}