import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Button from "../components/LoginButton";
import LoginInput from "../components/LoginInput";
import axios from "axios";
import { URL } from '../utils/const';
import { image } from "../utils/const";
import { launchImageLibrary } from 'react-native-image-picker'; // 추가

type RootStackParamList = {
  SignupScreen: undefined;
  LoginScreen: undefined;
};

interface SignupScreenProps {
  navigation: NavigationProp<RootStackParamList, 'SignupScreen'>;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [userNickname, setuserNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      setButtonClicked(false);
    };
  }, []);

  const selectImage = () => {
    // launchImageLibrary가 null이 아닌지 확인하는 조건 추가
    if (launchImageLibrary) {
      launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
        if (response.assets && response.assets.length > 0) {
          const base64 = response.assets[0].base64;
          setImageBase64(base64);
        }
      });
    } else {
      console.log('react-native-image-picker 모듈이 제대로 로드되지 않았습니다.');
    }
  };

  const handleSignup = async () => {
    if (!buttonClicked && (password !== confirmPassword)) {
      Alert.alert('Error', '비밀번호가 일치하지 않습니다.');
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('memberId', email);
    formData.append('memberPw', password);
    formData.append('name', userName);
    if (imageBase64) {
      formData.append('image', imageBase64);
    }
    formData.append('nickname', userNickname);

    try {
      const response = await axios.post(`${URL}/users/join`, formData);
      console.log('Signup Success:', response.data);
      Alert.alert("회원가입 성공!");
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };
  
  const handleContinue = () => {
    if (buttonClicked) {
      handleSignup();
    } else {
      // 버튼 클릭 시 입력값 초기화
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setuserName('');
      setuserNickname('');
      setButtonClicked(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.view}>
        <Text style={styles.text}>회원가입</Text>
        {buttonClicked ? (
          <>
            <LoginInput placeholder="이름" keyboardType="default" onChangeText={setuserName} defaultValue={userName} clearTextOnFocus />
            <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
              <Image source={require('../assets/image/upload-icon.png')} style={styles.image} />
            </TouchableOpacity>
            <LoginInput placeholder="닉네임" keyboardType="default" onChangeText={setuserNickname} defaultValue={userNickname} clearTextOnFocus />
          </>
        ) : (
          <>
            <LoginInput placeholder="example@email.com" keyboardType="email-address" onChangeText={setEmail} defaultValue={email} />
            <LoginInput placeholder="비밀번호" keyboardType="default" secureTextEntry={true} onChangeText={setPassword} defaultValue={password} />
            <LoginInput placeholder="비밀번호 확인" keyboardType="default" secureTextEntry={true} onChangeText={setConfirmPassword} defaultValue={confirmPassword} />
          </>
        )}
        <Button
          style={{ width: '85%', height: '13%', marginTop: '4%' }}
          buttonText={buttonClicked ? '회원가입' : '계속하기'}
          onPress={handleContinue}
        />
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
    marginBottom: 30
  },
  imageButton: {
    width: '85%',
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 10
  },
  image: {
    width: 30,
    height: 30,
  },
});
