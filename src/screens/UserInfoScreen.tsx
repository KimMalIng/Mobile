import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/LoginButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { URL } from '../utils/const';

type RootStackParamList = {
  UserInfoScreen: undefined;
  MainScreen: undefined;
  MypageScreen: undefined;
};

type UserInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserInfoScreen'>;

interface UserInfoScreenProps {
  navigation: UserInfoScreenNavigationProp;
}

export default function UserInfoScreen({ navigation }: UserInfoScreenProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Simulate API call to get user info
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const tokensString = await AsyncStorage.getItem("Tokens");
      if (!tokensString) {
        console.error("Tokens not found in AsyncStorage");
        return;
      }
  
      const tokens = JSON.parse(tokensString);
      const { accessToken, refreshToken } = tokens;
  
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `refreshToken=${refreshToken}`
      };
  
      const response = await axios.get(`${URL}/users/info`, { headers });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        {userInfo ? (
          <>
            <Image source={{ uri: `data:image;base64,${userInfo.image.imageDataBase64}` }} style={styles.image} />
            <Text style={styles.text}>{userInfo.nickname}님</Text>
            {userInfo.loginType === "service" ? (
              <Text style={styles.serviceText}>{userInfo.memberId}</Text>
            ) : userInfo.loginType === "kakao" ? (
              <Text style={styles.serviceText}>카카오 로그인</Text>
            ) : null}
            <Button style={styles.button} buttonText="완료" />
          </>
        ) : (
          <Text>Loading...</Text>
        )}
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
    fontSize: 30,
    color: '#1F2421',
    fontWeight: '900',
    marginBottom: 10
  },
  serviceText: {
    fontFamily: 'SeoulNamsanB',
    color: "#DCE1DE",
    fontSize: 20,
    marginBottom: 20
  },
  button: {
    width: '85%',
    height: '13%',
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "cover",
    marginBottom: 10
  },
});
