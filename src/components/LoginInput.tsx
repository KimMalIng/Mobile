import React from "react";
import { StyleSheet, TextInput, KeyboardTypeOptions, TextInputProps } from "react-native";

interface LoginInputProps extends TextInputProps {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = ({
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      textAlignVertical="center"
      textAlign="center"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      {...props} // Pass other TextInput props
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#DCE1DE',
    height: 45,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomColor: '#216869',
    borderBottomWidth: 2,
    color: '#255D51',
    fontFamily: 'SeoulNamsanB',
    fontSize: 16,
    marginTop: 10,
  }
});

export default LoginInput;
