import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import Todo from "../components/Todo";

export default function MainScreen() {
  const todoData = [
    { text: "회화 레슨", label: 0 },
    { text: "캡스톤 디자인(1) UI", label: 1 },
    { text: "운동", label: 0 },
    { text: "도서 반납", label: 1 },
    { text: "아르바이트", label: 0 }
  ];

  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      {todoData.map((todo, index) => (
        <Todo key={index} text={todo.text} label={todo.label} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: "100%"
  }
});
