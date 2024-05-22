import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { URL } from "./const";

export const getTokens = (email, password, navigation) => {
    axios.post(`${URL}/users/login`,
    {
      "memberId":email,
      "memberPw":password
    })
    .then(res =>{{
          //accessToken, refreshToken 로컬에 저장
          if (res.status === 200){
            AsyncStorage.setItem('Tokens', JSON.stringify({
              'accessToken': res.data.accessToken,
              'refreshToken': res.data.refreshToken,
              'memberId': res.data.memberId
            }))
            // navigation.navigate('MainScreen');
            navigation.navigate('Tab');
          }

    }})
    .catch(error =>{
            if(error.response.status === 401){
                console.error(error.response.data)
            }
            else{
                console.error(error)
            } 
          
    })
};

const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem("Tokens");
    if (value !== null) {
      return JSON.parse(value)
    }
    else{
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};


export const verifyTokens = async (navigation) => {
  const Token = await getTokenFromLocal();
  // 최초 접속
  if (Token === null){
    navigation.reset({routes: [{name: "LoginScreen"}]});
  }
  // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증 
  else{
    const headers_config = {
      "refresh": Token.refreshToken,
      Authorization: `Bearer ${Token.accessToken}`   
    };

    try {
      const res = await axios.get(`${URL}/refresh`, {headers: headers_config})

      // accessToken 만료, refreshToken 정상 -> 재발급된 accessToken 저장 후 자동 로그인
      AsyncStorage.setItem('Tokens', JSON.stringify({
        ...Token,
        'accessToken': res.data.data.accessToken,
      }))
      navigation.reset({routes: [{name: "HomeTab"}]});

    } catch(error){
      const code = error.response.data.code; 

      // accessToken 만료, refreshToken 만료 -> 로그인 페이지
      if(code === 401){
        navigation.reset({routes: [{name: "LoginScreen"}]});
      }
      // accessToken 정상, refreshToken 정상 -> 자동 로그인
      else{
        navigation.reset({routes: [{name: "Tab"}]});
      }
    }
  }
};