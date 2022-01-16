import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginSreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OfferScreen from './screens/OfferScreen';
import RouteScreen from './screens/RouteScreen';
import FindScreen from './screens/FindScreen';
import ResultsScreen from './screens/ResultsScreen';
import ArchiveScreen from './screens/ArchiveScreen';
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

const AppStack = createStackNavigator({
  Navigation: {
    screen: NavigationScreen,
    navigationOptions: {
    }
  },
  Route: {
    screen: RouteScreen,
    navigationOptions: {
      // headerShown: false
      headerTitle: 'TestTitle'
    }
    },
  Find: {
    screen: FindScreen,
    navigationOptions: {
      // headerShown: false
      headerTitle: 'TestTitle'
    }
    },
  Offer: {
    screen: OfferScreen,
    navigationOptions: {
      // headerShown: false
      headerTitle: 'TestTitle'
    }
    },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      // headerShown: false
      headerTitle: 'TestTitle',
      headerShown: true
    }
    },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      // headerShown: false
      headerTitle: 'TestTitle'
    }
    },
  Results: {
    screen: ResultsScreen,
    navigationOptions: {
      // headerShown: false
      headerTitle: 'TestTitle'
    }
  },
    Archive: {
      screen: ArchiveScreen,
      navigationOptions: {
        // headerShown: false
        headerTitle: 'TestTitle'
    }
}})

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Register: RegisterScreen
})

const RootApp = createAppContainer(
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

export default function App() {

  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return <RootApp />;
}

// export default class App extends Component {
//   state = {
//     loaded: false
//   };
//   // create a helper function to load the font 
//   _loadFontsAsync = async () => {
//   // loadAsync returns true | error
//     let isLoaded = await Font.loadAsync({
//       // add as many fonts as you want here .... 
//       Montserrat: require("./assets/fonts/Lobster-Regular.ttf")
//     });
//     this.setState({ loaded: isLoaded });
//   };

// // call _loadFontsAsync 
//   componentDidMount() {
//     this._loadFontsAsync();
//   }

//   render() {
//     if (!this.state.loaded) {
//       return <AppLoading />;
//     }
//     // from the custom App we return the component we assigned to RootApp.
//     return <RootApp />;
//   }
// }

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
