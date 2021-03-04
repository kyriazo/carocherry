import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import CarScreen from './CarScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileInput from "../components/ProfileInput";
import HomeScreen from "./HomeScreen";


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

const Tab = createBottomTabNavigator();

export default function NavigationScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Cars: 'car',
              Profile: 'account',
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={HomeTabScreen} />
        <Tab.Screen name="Cars" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
