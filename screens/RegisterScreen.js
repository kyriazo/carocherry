import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { ExecutionEnvironment } from "expo-constants";

export default class RegisterScreen extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        errorMessage: ""
    }

    handleSignUp = () => {

        
        //This firebase call is responsible for creating the user entity, provided it has an email and a password. On successful completion,
        //we use the default profile picture url and create a user profile entry on the database.
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                const url = 'https://firebasestorage.googleapis.com/v0/b/carocherry-61146.appspot.com/o/image%2Fdefault.jpg?alt=media&token=26a5a726-c8ab-4938-b247-3af72a507092'
                const profileDetails = {
                    name: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    image: url,
                    birthYear: '',
                    miniBio: '',
                    plate: '',
                    make: '',
                    model: '',
                    color: ''
                };
                firebase.database().ref(`/users/${userCredentials.user.uid}`)
                .set(profileDetails);
                
            })
            .catch(error => {
                // console.log(error.code);
                switch (error.code) {
                    case 'auth/invalid-email':
                        this.setState({ errorMessage: 'Please enter a valid email.' });
                        break;
                    case 'auth/email-already-in-use':
                        this.setState({ errorMessage: error.message });
                        break;
                    case 'auth/weak-password':
                        this.setState({ errorMessage: error.message });
                        break;
                    case 'auth/email-already-in-use':
                        this.setState({ errorMessage: error.message });
                        break;
                }
            });

    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    {"Hello!\nSign up to get started."}
                </Text>

                <View style={styles.errorMessage}>
                    <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
                </View>

                <View style={styles.form}>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={firstName => this.setState({ firstName })}
                            value={this.state.firstName}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={lastName => this.setState({ lastName })}
                            value={this.state.lastName}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => {
                                this.setState({ password })
                            }}
                            vale={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ alignSelf: "center", marginTop: 32}} onPress={this.props.navigation.navigate("Auth")}>
                <Text style={{ color: "#414959", fontSize: 13}}>
                    New to Carocherry? <Text style={{ fontWeight: "500", color: "#E9446A"}}>Login</Text>
                    </Text>
            </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 48,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",

    }
})