import React, { useState } from "react";
import {
  Text, View, SafeAreaView,
  TouchableHighlight, TextInput, Alert
} from 'react-native';
import { styles, blue } from '../../styles/styles'
import auth from '@react-native-firebase/auth';


const isEmailValid = (email: string) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const ERROR_TITLE = 'Error';
const INVALID_EMAIL_MESSAGE = 'A valid email is required';
const INVALID_AUTH_MESSAGE = 'Invalid user or password';
const INVALID_PASSWORD_MESSAGE = 'A valid password is required';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const loginAction = async () => {
    if (!email || !isEmailValid(email)) {
      Alert.alert(ERROR_TITLE, INVALID_EMAIL_MESSAGE)
      return;
    } else if (!password) {
      Alert.alert(ERROR_TITLE, INVALID_PASSWORD_MESSAGE);
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      Alert.alert(ERROR_TITLE, INVALID_AUTH_MESSAGE);
      console.error(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleStyle}>
          NativeFire Login
        </Text>
      </View>
      <View style={styles.formContainerStyle}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Your email"
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInputStyle}
          selectionColor={blue}
          placeholder="Your password"
          onChangeText={text => setPassword(text)} />
      </View>

      <View style={styles.buttonContainerStyle}>
        <TouchableHighlight style={styles.buttonStyle} onPress={loginAction} underlayColor={blue}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.buttonTextStyle}>Login</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen