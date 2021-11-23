import React from "react";
import { ScrollView, Picker, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileInput from "../components/ProfileInput";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase";


export default class ConfirmScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            destination: { latitude: this.props.navigation.state.params.state.destination.latitude, longitude: this.props.navigation.state.params.state.destination.longitude},
            origin: { latitude: this.props.navigation.state.params.state.origin.latitude, longitude: this.props.navigation.state.params.state.origin.longitude},
            originName: this.props.navigation.state.params.state.originName,
            destinationName: this.props.navigation.state.params.state.destinationName,
            date: this.props.navigation.state.params.state.date.toString(),
            isOffer: this.props.navigation.state.params.state.isOffer,
            petsAllow: this.props.navigation.state.params.state.petsAllow,
            musicAllow: this.props.navigation.state.params.state.musicAllow,
            smokingAllow: this.props.navigation.state.params.state.smokingAllow,
            seats: this.props.navigation.state.params.state.seats,
            uid: '',
        };
    }

    consoleInfo = () => {
    
        console.log(this.props.navigation.state.params.state);
        //console.log(this.props);
        //console.log(this.props.navigation.state.params.state.destinationPlace.value.details);
    }
 
    uploadRoute = () => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/rides/`).push({
        destination: this.state.destination,
        destinationName: this.state.destinationName,
        origin: this.state.origin,
        originName: this.state.originName,
        uid: currentUser.uid,
        date: this.state.date,
        isOffer: this.state.isOffer,
        petsAllow: this.state.petsAllow,
        musicAllow: this.state.musicAllow,
        smokingAllow: this.state.smokingAllow,
        seats: this.state.seats,
    });
        //this.props.navigation.navigate("Home")
    }

    render() {
     
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>

                        <Text>Confirm your preferences</Text>
                        <Text>From {this.state.originName}</Text>
                        <Text>To {this.state.destinationName}</Text>
                        <Text>{this.state.date}</Text>
                        <Text>Is it an offer = {this.state.isOffer}</Text>
                        <Text>Seats available: {this.state.seats}</Text>
                        <Text>Smoking allowed = {this.state.smokingAllow.toString()}</Text>
                        <Text>Music allowed = {this.state.musicAllow.toString()}</Text>
                        <Text>Pets allowed = {this.state.petsAllow.toString()}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.uploadRoute}>
                                <Text style={{ color: "#FFF", fontWeight: "500" }}>Offer Ride</Text>
                        </TouchableOpacity> 
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    upperView: {
        flexDirection: 'row',
        backgroundColor: "#E9446A",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lowerView: {
        flex: 3,
    },
    circle: {
        height: 120,
        width: 120,
        borderRadius: 120,
        alignSelf: 'center',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    textTitles: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7D0036'
    },
})