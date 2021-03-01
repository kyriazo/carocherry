import * as React from 'react';
import {View, Text} from 'react-native';
import ProfileInput from "../components/ProfileInput";

export default function CarScreen() {
  return (
    <View>
    <ProfileInput title='Pick a car' inputType='default'/>
    <ProfileInput title='Pick the color' inputType='default'/>
    <ProfileInput title='Pick a car' inputType='default'/>
    <ProfileInput title='Pick a car' inputType='default'/>
    </View>
  );
}
