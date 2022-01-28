import * as React from 'react';
import { StyleSheet } from 'react-native';
import  Logout  from '../components/Logout';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from './ProfileScreen';
import CarScreen from './CarScreen';
import OfferScreen from './OfferScreen';
import FindScreen from './FindScreen';
import RouteScreen from './RouteScreen';
import ArchiveScreen from './ArchiveScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileInput from "../components/ProfileInput";
import HomeScreen from "./HomeScreen";
import MyRidesScreen from "./MyRidesScreen"
import MyRequestsScreen from "./MyRequestsScreen"
import * as firebase from "firebase";


function HomeTabScreen({ navigation }) {
  return (
    <ProfileScreen />
  );
}

function SettingsScreen({ navigation }) {
  return (
     <CarScreen />
  );
}

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MyRidesTab = createMaterialTopTabNavigator();
const OfferStack = createStackNavigator();
const FindStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      elevation: 0,
      backgroundColor: '#dd5b45',
    },
    headerTitleStyle: {
      color:'white',
      fontSize: 26
    },
    headerTintColor: 'white',
    cardStyle: {backgroundColor: '#ffffff'},
    headerLeft:"",
    headerRight: () => { 
        return (
        <Logout             
            onPress={() => firebase.auth().signOut() }
            title= ""
            icon='logout' />
      )
    }
    }}>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
  </HomeStack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  console.log('ProfileNAvigator')
  return(
  <ProfileStack.Navigator initialRouteName="Profile" screenOptions={{
    headerStyle: {
      elevation: 0,
      backgroundColor: '#dd5b45',
    },
    headerTitleStyle: {
      color:'white',
      fontSize: 26
    },
    headerTintColor: 'white',
    cardStyle: {backgroundColor: '#ffffff'}}}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
  </ProfileStack.Navigator>
  )
}

const MyRidesTabNavigator = () => {
  return (
  <MyRidesTab.Navigator 
  tabBarOptions= {{
    labelStyle: {
    color: '#7d3aff',
    fontSize: 12,
    lineHeight: 12,
    backgroundColor: '#a0f312',
  },
  tabStyle: {
    height: 300, // the only change is here
    borderWidth: 1,
    borderColor: '#7d3aff',
    borderRadius: 10,
    backgroundColor: '#f012',
  },
  style: {
    // height: 30, // there is no difference do it or apply height in tabStyle
    backgroundColor: '#fff',
  },
  indicatorStyle: {
    height: 0,
  },
}}
    >
    <MyRidesTab.Screen name="MyRides" component={MyRidesScreen}/>
    <MyRidesTab.Screen name="MyRequests" component={MyRequestsScreen}/>
    <MyRidesTab.Screen name="MyArchives" component={ArchiveScreen}/>

  </MyRidesTab.Navigator>
  )
}

const OfferStackNavigator = () => {
  return (
  <OfferStack.Navigator screenOptions={{
    headerStyle: {
      elevation: 0,
      backgroundColor: '#dd5b45',
    },
    headerTitleStyle: {
      color:'white',
      fontSize: 26
    },
    headerTintColor: 'white',
    cardStyle: {backgroundColor: '#ffffff'}}}>
    <OfferStack.Screen name="Offer" component={OfferScreen}/>
    <OfferStack.Screen name="Route" component={RouteScreen}/>
  </OfferStack.Navigator>
  )
}

const FindStackNavigator = () => {
  return (
  <FindStack.Navigator screenOptions={{
    headerStyle: {
      elevation: 0,
      backgroundColor: '#dd5b45',
    },
    headerTitleStyle: {
      color:'white',
      fontSize: 26
    },
    headerTintColor: 'white',
    cardStyle: {backgroundColor: '#ffffff'}}}>
    <FindStack.Screen name="Find" component={FindScreen}/>
  </FindStack.Navigator>
  )
}

// Results: {
//   screen: ResultsScreen,
//   navigationOptions: {
//     // headerShown: false
//     headerTitle: 'TestTitle'
//   }
// },
//   Archive: {
//     screen: ArchiveScreen,
//     navigationOptions: {
//       // headerShown: false
//       headerTitle: 'TestTitle'
//   }
export default class NavigationScreen extends React.Component {

  //Hides the Container stack navigator header.
  componentDidMount() {
    this.props.navigation.setOptions({headerShown: false})
     }

    
    render() {
      return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Home: 'home',
                Profile: 'account',
                Rides: "format-list-bulleted",
                Offer: 'car-hatchback',
                Find: 'magnify'
              };
              return (
                <MaterialCommunityIcons
                  name={icons[route.name]}
                  color='#E9446A'
                  size={30}
                />
              );
            },
          })
          }
        >
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Profile" component={ProfileStackNavigator} />
          <Tab.Screen name="Rides" component={MyRidesTabNavigator} />
          <Tab.Screen name="Offer" component={OfferStackNavigator} />
          <Tab.Screen name="Find" component={FindStackNavigator} />
        </Tab.Navigator>

        </NavigationContainer>
      )
        }    
  
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#dd5b45',
    color: 'white'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
})
