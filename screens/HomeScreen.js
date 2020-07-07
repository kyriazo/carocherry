import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {

    state = {
        email: "",
        displayName: "",
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
   
        this.setState({ email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

    render() {
      
        return (

            <View style={styles.container}>
                <Text>Hi {this.state.email}</Text>
                <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>

             
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Account")}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>Account</Text>
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