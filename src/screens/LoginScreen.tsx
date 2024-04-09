import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Text style={styles.text}>로그인</Text>
        <LoginInput placeholder="example@email.com" keyboardType="email-address"/>
        <LoginInput placeholder="비밀번호" keyboardType="default" secureTextEntry={true}/>
        <LoginButton buttonText="계속하기" />
        <LoginButton buttonText="회원가입"/>
      </View>
      <Image style={{marginTop: 30}} source={require('../assets/image/kakao_login_medium_wide.png')}/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#9CC5A1', 
    height: '100%'
  },
  view: {
    backgroundColor:'white', 
    width: '75%', 
    height: '48%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 10
  },
  text: {
    fontFamily: 'SeoulNamsanB', 
    fontSize: 20, 
    color: '#1F2421', 
    fontWeight: '900', 
    marginBottom: 70
  }
})