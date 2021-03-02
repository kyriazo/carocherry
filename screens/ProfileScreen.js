import React from "react";
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileInput from "../components/ProfileInput";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            image: 'default',
            birthYear: '',
            miniBio: '',
        };
    }

    nameHandler = (name) => {
        this.setState({
            name: name
        });
    }
    lastNameHandler = (name) => {
        this.setState({
            lastName: name
        });
    }
    bYearHandler = (byear) => {
        this.setState({
            birthYear: byear
        });
    }
    miniBioHandler = (bio) => {
        this.setState({
            miniBio: bio
        });
    }
    databaseHandler = () => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
            .set(this.state);
    }
    fetchHandler = () => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', (snapshot) => {
                snapshot.
                return;
            });
    }
    uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const { currentUser } = firebase.auth();
        var ref = firebase.storage().ref().child("image/" + currentUser.uid);
        return ref.put(blob);
    }

    render() {
     
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>

                    <View style={styles.upperView}>

                        <TouchableOpacity onPress={this._pickImage}>
                            <View style={{
                                height: 120,
                                width: 120,
                                borderRadius: 120,
                                backgroundColor: 'white'
                            }}>
                                <Image source={{ uri: this.state.image }} style={styles.circle} />
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.lowerView}>

                        <ProfileInput value={this.state.name} title='First Name' inputType='default' onUpdate={this.nameHandler} />
                        <ProfileInput value={this.state.lastName} title='Last Name' inputType='default' onUpdate={this.lastNameHandler} />
                        <ProfileInput value={this.state.birthYear} title='Year of birth' inputType='numeric' onUpdate={this.bYearHandler} />
                        <ProfileInput value={this.state.miniBio} title='Mini bio' inputType='default' onUpdate={this.miniBioHandler} />

                        <View style={{ padding: 30 }}>
                            <TouchableOpacity style={styles.button} onPress={this.databaseHandler}>
                                <Text style={{ color: "#FFF", fontWeight: "500" }}>Save Profile</Text>
                            </TouchableOpacity>
                        </View>
                          
                    </View>

                </View>
            </ScrollView>
        );
    }

    async componentDidMount()  {
        this.getPermissionAsync();
        const { currentUser } = firebase.auth();
        const ref = firebase.storage().ref("image/" + currentUser.uid);
        const url = await ref.getDownloadURL();
        var state;
        firebase.database()
            .ref((`/users/${currentUser.uid}`))
            .once('value')
            .then((snapshot) => {
                state = snapshot.val()
                this.setState({
                    name: state.name,
                    lastName: state.lastName,
                    birthYear: state.birthYear,
                    miniBio: state.miniBio,
                    image: url
                })

            })
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
            this.uploadImage(result.uri)
        } catch (E) {
            console.log(E);
        }
    };

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