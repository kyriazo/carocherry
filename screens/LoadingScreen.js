import React from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import * as firebase from "firebase";
import NavigationScreen from "./NavigationScreen";
import { StatusBar } from 'react-native';

//This is a middleware screen, only used to check if user is logged in, and navigate to the appropriate container.
export default class LoadingScreen extends React.Component {
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'NavigationScreen' : 'AuthenticationScreen')
            }
        )
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('black',true);
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})