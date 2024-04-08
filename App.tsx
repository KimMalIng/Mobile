import React from "react";
import LoginScreen from "./src/screens/LoginScreen.tsx";
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from "./src/screens/MainScreen";
import TodoList from "./src/components/TodoList.tsx";


export default function App() {
  return (
    <>
      {/* <LoginScreen/> */}
      {/* <MainScreen/> */}
      <TodoList/>
    </> 
  )
}