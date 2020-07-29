import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from './src/styles/styles'
import auth, { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";
import messaging from '@react-native-firebase/messaging';

import LoginScreen from "./src/scenes/login";

const App = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {

    requestUserPermission()

    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
    return subscriber;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? 
      (
        <View style={styles.containerStyle}>
          <Text style={{ textAlign: "center" }}>email {user.email} </Text>

          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={async () => {
                await firebase.auth().signOut();
              }}
            >
              <Text style={styles.buttonTextStyle}> Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) :
      (
        <View style={{ flex: 1 }}>
          <LoginScreen />
        </View>
      )}
    </View>
  );
}


export default App