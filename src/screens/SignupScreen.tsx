import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, Alert, TouchableOpacity  } from "react-native";
import { getTokens } from '../utils/tokenUtils';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Button from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

type RootStackParamList = {
  SignupScreen: undefined;
  LoginScreen: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignupScreen'>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    getTokens(email, password, navigation);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Text style={styles.text}>회원가입</Text>
        <LoginInput placeholder="example@email.com" keyboardType="email-address" onChangeText={setEmail} />
        <LoginInput placeholder="비밀번호" keyboardType="default" secureTextEntry={true} onChangeText={setPassword} />
        <LoginInput placeholder="비밀번호 확인" keyboardType="default" secureTextEntry={true} onChangeText={setPassword} />
        <Button style={{ width: '85%', height: '13%', marginTop: '4%' }} buttonText="계속하기" onPress={handleSignup} />
      </View>
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
