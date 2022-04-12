import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import * as firebase from "firebase";
import { color } from "react-native-reanimated";
import { StatusBar,BackHandler } from "react-native";

export default class LoginScreen extends React.Component {

    state = {
        email: "",
        password: "",
        errorMessage: ""
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    

    handleLogin = () => {
        const {email,password} = this.state

        firebase.auth().signInWithEmailAndPassword(email,password).catch(error => this.setState({ errorMessage: error.message }))
    }
    

    render() {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('black',true);

        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('../assets/logo_trans.png')} 
                />
                <Text style={styles.greeting}>
                    {"Welcome to Carocherry.\nLog in or Sign up and find or share your ride at the blink of an eye."}    
                </Text>

            <View style={styles.errorMessage}>
                {!!this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style={styles.form}>
                <View style={styles.email}>
                    {/* <Text style={styles.inputTitle}>Email Address</Text> */}
                    <TextInput 
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Email address"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    ></TextInput>
                </View>

                <View style={styles.password}>
                    {/* <Text style={styles.inputTitle}>Password</Text> */}
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        vale={this.state.password}
                    ></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.login} onPress={this.handleLogin}>
                <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 20,fontFamily: 'Lobster_400Regular'}}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.register}
            onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={{ color: "#414959", fontSize: 16, fontFamily: 'Lobster_400Regular'}}>
                    New to Carocherry? <Text style={{ fontWeight: "500", color: "#E9446A"}}>Sign Up</Text>
                    </Text>
            </TouchableOpacity>
        </View>
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
        height: 50,
        fontSize: 18,
        color: "black",
        borderRadius: 10,
        marginTop: 15,
        backgroundColor: 'white',
        paddingLeft: 15
    },
    login: {
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
    register: {
        alignSelf: "center",
        marginTop: 32,
        
    }
})