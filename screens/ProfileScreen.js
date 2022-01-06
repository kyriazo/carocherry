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
            plate: '',
            make: '',
            model: '',
            color: ''
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
    plateHandler = (plt) => {
        this.setState({
            plate: plt
        });
    }
    modelHandler = (mdl) => {
        this.setState({
            model: mdl
        });
    }
    makeHandler = (mk) => {
        this.setState({
            make: mk
        });
    }
    colorHandler = (clr) => {
        this.setState({
            color: clr
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
                <View style={ styles.container }>

                    <View style={styles.upperView}>
                        <TouchableOpacity onPress={this._pickImage}>
                            <View style={{
                                height: 80,
                                width: 80,
                                borderRadius: 80,
                                // backgroundColor: 'white',
                            }}>
                                <Image style={styles.image} source={{ uri: this.state.image }} style={styles.circle} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.fullName} >{this.state.name} {this.state.lastName}</Text>
                    </View>


                    <View style={styles.lowerView}>

                        <Text style={styles.sectionLabel}>Profile</Text>
                        <ProfileInput style={styles.sectionInput} value={this.state.name} title='First Name' inputType='default' onUpdate={this.nameHandler} />
                        <ProfileInput style={styles.sectionInput} value={this.state.lastName} title='Last Name' inputType='default' onUpdate={this.lastNameHandler} />
                        <ProfileInput style={styles.sectionInput} value={this.state.birthYear} title='Year of birth' inputType='numeric' onUpdate={this.bYearHandler} />
                        <ProfileInput style={styles.sectionInput} value={this.state.miniBio} title='Mini bio' inputType='default' onUpdate={this.miniBioHandler} />
                        <Text style={styles.sectionLabel}>Vehicle</Text>
                        <ProfileInput style={styles.sectionInput} value={this.state.plate} title='Plate' inputType='default' onUpdate={this.plateHandler} />
                        <ProfileInput style={styles.sectionInput} value={this.state.make} title='Make' inputType='default' onUpdate={this.makeHandler} />
                        <ProfileInput style={styles.sectionInput} value={this.state.model} title='Model' inputType='default' onUpdate={this.modelHandler} />
                        <ProfileInput style={styles.sectionInput} value={this.state.color} title='Color' inputType='default' onUpdate={this.colorHandler} />
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
                    image: url,
                    plate: state.plate,
                    make: state.make,
                    model: state.model,
                    color: state.color

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
        backgroundColor: '#f3e1d6'
    },
    upperView: {
        flexDirection: 'row',
        // backgroundColor: "#E9446A",
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
    },
    lowerView: {
        flex: 3,
    },
    circle: {
        height: 80,
        width: 80,
        borderRadius: 80,
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
    sectionLabel: {
        fontSize: 24,
        paddingTop: 10,
        fontWeight: "bold",
        paddingBottom: 5,
        // paddingLeft: 10
        marginLeft: 15
    },
    inputLabel: {
        paddingLeft: 10,
    },
    image: {
        width: 30,
        height: 30
    },
    fullName: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#dd5b45"
    }
})