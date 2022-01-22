import * as React from 'react';
import { StyleSheet } from 'react-native';
import  Pressable  from '../components/Pressable';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import CarScreen from './CarScreen';
import OfferScreen from './OfferScreen';
import FindScreen from './FindScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileInput from "../components/ProfileInput";
import HomeScreen from "./HomeScreen";
import MyRidesScreen from "./MyRidesScreen"


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
const MyRidesStack = createStackNavigator();
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
    headerRight: () => { 
        return (
        <Pressable             
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

const MyRidesStackNavigator = () => {
  return (
  <MyRidesStack.Navigator screenOptions={{
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
    }}>
    <MyRidesStack.Screen name="MyRides" component={MyRidesScreen}/>
  </MyRidesStack.Navigator>
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
          })}
        >
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Profile" component={ProfileStackNavigator} />
          <Tab.Screen name="My Rides" component={MyRidesStackNavigator} />
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
