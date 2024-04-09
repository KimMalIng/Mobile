import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LoginButtonProps {
    buttonText: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ buttonText }) => {
    return (
        <TouchableOpacity style={styles.touchop}>
            <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchop: {
        backgroundColor: '#49A078',
        width: '85%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 4
    },
    text: {
        fontFamily: 'SeoulNamsanB',
        fontSize: 16,
        color: 'white'
    }
});

export default LoginButton;