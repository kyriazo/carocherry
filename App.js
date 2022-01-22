import { createStackNavigator,createSwitchNavigator } from "@react-navigation/stack";
import { AppContainer,NavigationContainer } from "@react-navigation/native"
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginSreen';
import RegisterScreen from './screens/RegisterScreen';
import * as firebase from "firebase";
import NavigationScreen from "./screens/NavigationScreen";
import { LogBox,View } from 'react-native';
import React from 'react';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import AppLoading from 'expo-app-loading';



LogBox.ignoreLogs(['Setting a timer']);

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
//firebase.analytics();


//Creates anonymous user navigation container
const AuthStack = createStackNavigator();
const AuthStackNavigator = () => {
  return(
  <AuthStack.Navigator screenOptions={{headerShown: false, headerStyle: {elevation: 0},cardStyle: {backgroundColor: '#ffffff'}}}>
  <AuthStack.Screen name="Login" component={LoginScreen} />
  <AuthStack.Screen name="Register" component={RegisterScreen} navigationOptions= {{headerTitle:'Whatever'}} />
</AuthStack.Navigator>
  )
}

//Creates logged-in user navigation container
const AppStack = createStackNavigator();
const AppStackNavigator = () => {
  return(
<AppStack.Navigator screenOptions={{headerShown: false,headerStyle: {elevation: 0},cardStyle: {backgroundColor: '#ffffff'}}}>
  <AppStack.Screen name="LoadingScreen" component={LoadingScreen} navigationOptions= {{headerShown:false}} />
  <AppStack.Screen name="NavigationScreen" component={NavigationScreen} navigationOptions= {{headerShown:false}} />
  <AppStack.Screen name="AuthenticationScreen" component={AuthStackNavigator} navigationOptions= {{headerShown:false}} />
</AppStack.Navigator>
  )
}


export default function App() {

  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });
  //Use a loader to make sure the user won't see the actuall app before fonts are loaded.
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return <NavigationContainer><AppStackNavigator/></NavigationContainer>;
  }
