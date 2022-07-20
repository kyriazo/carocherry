import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";
import { ExecutionEnvironment } from "expo-constants";
import { StatusBar } from 'react-native';

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
                    contactInf: '',
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
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('black',true);
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position">
                <Image style={styles.logo}
                    source={require('../assets/logo_trans.png')} 
                />
                <Text style={styles.greeting}>
                    {"Hello!\nSign up on Carocherry and become a memeber of the largest ridesharing community."}
                </Text>

                <View style={styles.errorMessage}>
                    <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.email}>
                        {/* <Text style={styles.inputTitle}>First Name</Text> */}
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="First Name"
                            onChangeText={firstName => this.setState({ firstName })}
                            value={this.state.firstName}
                        ></TextInput>
                    </View>

                    <View style={styles.email}>
                        {/* <Text style={styles.inputTitle}>Last Name</Text> */}
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Last Name"
                            onChangeText={lastName => this.setState({ lastName })}
                            value={this.state.lastName}
                        ></TextInput>
                    </View>

                    <View style={ styles.email}>
                        {/* <Text style={styles.inputTitle}>Email Address</Text> */}
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Email address"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View styles={styles.password}>
                        {/* <Text style={styles.inputTitle}>Password</Text> */}
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="Password"
                            onChangeText={password => {
                                this.setState({ password })
                            }}
                            vale={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.register} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 20,fontFamily: 'Lobster_400Regular'}}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.login}
            onPress={() => this.props.navigation.navigate("Login")}>
                <Text style={{ color: "#414959", fontSize: 16, fontFamily: 'Lobster_400Regular'}}>
                    Already have an account on Carocherry? <Text style={{ fontSize: 16,fontWeight: "500", color: "#E9446A"}}>Log In</Text>
                    </Text>
            </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3e1d6',
        color: '#dd5b45',
        // justifyContent: 'center'
        paddingTop: 150
    },
    greeting: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: '#dd5b45',
        maxWidth: '70%',
        alignSelf: 'center',
        marginBottom: 30,
        fontFamily: 'Lobster_400Regular'
    },
    logo: {
        width: 450,
        height: 100,
        alignSelf: 'center'
    },
    errorMessage: {
        maxHeight: 72,
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
        marginBottom: 15,
        maxWidth: '80%',
        alignSelf: 'center',
        width: '100%'
    },
    inputTitle: {
        color: "white",
        fontSize: 16,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        // borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50,
        fontSize: 18,
        color: "black",
        borderRadius: 10,
        marginTop: 15,
        backgroundColor: 'white',
        paddingLeft: 15
    },
    register: {
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 50,
        alignSelf: 'center',
        width: '100%',
        maxWidth: '80%',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 30,
        fontFamily: 'Lobster_400Regular',
        marginTop: 20
    },
    login: {
        alignSelf: "center",
        marginTop: 32,
    }
})