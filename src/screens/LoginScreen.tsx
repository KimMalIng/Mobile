import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, Alert } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import MainScreen from './MainScreen';
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  LoginScreen: undefined;
  MainScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     // Simulate login request
  //     const response = await new Promise((resolve) =>
  //       setTimeout(() => resolve({ data: { accessToken: 'dummyToken' } }), 1000)
  //     );

  //     // Assuming the response format is as you described
  //     const { accessToken } = response.data;
  //     // Navigate to MainScreen upon successful login
  //     navigation.navigate("MainScreen", { accessToken });
  //   } catch (error) {
  //     // Handle login failure (e.g., show an alert)
  //     Alert.alert('Login Failed', 'Please check your credentials and try again.');
  //   }
  // };
  const handleLogin = () => {
    // Check if the provided memberId and memberPw match the expected values
    if (memberId === 'KimMalling' && memberPw === '1234') {
        navigation.navigate("MainScreen");
    };
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Text style={styles.text}>로그인</Text>
        <LoginInput placeholder="example@email.com" keyboardType="email-address" onChangeText={setMemberId} />
        <LoginInput placeholder="비밀번호" keyboardType="default" secureTextEntry={true} onChangeText={setMemberPw} />
        <LoginButton style={{ width: '85%', height: '15%', marginVertical: 10 }} buttonText="계속하기" onPress={handleLogin} />
        <LoginButton style={{ width: '85%', height: '15%' }} buttonText="회원가입" />
      </View>
      <Image style={{ marginTop: 30 }} source={require('../assets/image/kakao_login_medium_wide.png')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9CC5A1',
    height: '100%'
  },
  view: {
    backgroundColor: 'white',
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
});
