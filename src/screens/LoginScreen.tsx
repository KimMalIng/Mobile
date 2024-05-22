import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, Alert, TouchableOpacity  } from "react-native";
import { getTokens } from '../utils/tokenUtils';
import LoginButton from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from "@react-native-seoul/kakao-login";
import axios from "axios";

type RootStackParamList = {
  LoginScreen: undefined;
  MainScreen: undefined;
  SignupScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<string>("");

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
      navigation.navigate("MainScreen");
    } catch (err) {
      console.error("login err", err);
    }
  };

  const handleLogin = () => {
    getTokens(email, password, navigation);
  };

  const handleSignup = () => {
    navigation.navigate("SignupScreen");
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Text style={styles.text}>로그인</Text>
        <LoginInput placeholder="example@email.com" keyboardType="email-address" onChangeText={setEmail} />
        <LoginInput placeholder="비밀번호" keyboardType="default" secureTextEntry={true} onChangeText={setPassword} />
        <LoginButton style={{ width: '85%', height: '13%', marginVertical: 8 }} buttonText="계속하기" onPress={handleLogin} />
        <LoginButton style={{ width: '85%', height: '13%' }} buttonText="회원가입" onPress={handleSignup}/>
      </View>
      <TouchableOpacity onPress={signInWithKakao}>
        <Image
          style={{ marginTop: 30 }}
          source={require('../assets/image/kakao_login_medium_wide.png')}
        />
      </TouchableOpacity>
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
