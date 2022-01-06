import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
 
    state = {
        email: "",
        name: "",
    };

    componentDidMount() {
        const { email, name } = firebase.auth().currentUser;

        const { currentUser } = firebase.auth();
        var state;
        firebase.database()
            .ref((`/users/${currentUser.uid}`))
            .once('value')
            .then((snapshot) => {
                state = snapshot.val()
                this.setState({
                    name: state.name,
                })
            })
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    render() {
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        return (

            <View style={styles.container}>
                <Text>Hi {this.state.name}</Text>
                <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>



        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 100,
        width: '80%',
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    }
})