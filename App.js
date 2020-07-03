import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginSreen';
import RegisterScreen from './screens/RegisterScreen';
import * as firebase from "firebase";

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyC-hAp3NaX6-HSRynlB9Jxw6DElwY6t8SE",
  authDomain: "carocherry-61146.firebaseapp.com",
  databaseURL: "https://carocherry-61146.firebaseio.com",
  projectId: "carocherry-61146",
  storageBucket: "carocherry-61146.appspot.com",
  messagingSenderId: "998772664994",
  appId: "1:998772664994:web:452a0c00c7d78071a545fb",
  measurementId: "G-ZZ40LJYWE7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const AppStack = createStackNavigator({
  Home: HomeScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading"
    }
  )
)

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
