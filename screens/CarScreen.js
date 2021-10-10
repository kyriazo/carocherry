import _ from "lodash";
import React from "react";
import {
  Modal,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import ProfileInput from "../components/ProfileInput";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { FlatList, TapGestureHandler } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons'; 


export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      make: "",
      model: "",
      color: "",
      cars: [],
      show: false,
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/cars`).push({
      make: this.state.make,
      model: this.state.model,
      color: this.state.color,
    });
    this.setState({ show: false });
  };

  consoleLog = () => {
    console.log(this.state);
  };

  carDelete = (uid) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/cars/${uid}`).remove();
  };

  render() {
    return (
      <View>
        <Modal visible={this.state.show} animationType="slide">
          <View>
            <ProfileInput
              title="Make"
              inputType="default"
              onUpdate={(make) => this.setState({ make })}
            />
            <ProfileInput
              title="Model"
              inputType="default"
              onUpdate={(model) => this.setState({ model })}
            />
            <ProfileInput
              title="Color"
              inputType="default"
              onUpdate={(color) => this.setState({ color })}
            />
            <TouchableOpacity style={styles.button} onPress={this.hideModal}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity style={styles.button} onPress={this.showModal}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Add a car</Text>
        </TouchableOpacity>
    
        
        <FlatList
          data={this.state.cars}
          keyExtractor={(item, index) => item.key}
          key={(item, index) => item.key}
          renderItem={({ item }) => {
            return (
              <View style={styles.upperView}>
                <Text style={styles.textTitles}>
                  {item.make} {item.model} {item.color}
                </Text>
                <View  style={styles.textTitles}>
                  <TouchableOpacity
                    onPress={() => this.carDelete(item.uid)}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }

  async componentDidUpdate() {
    this.getPermissionAsync();
    const { currentUser } = firebase.auth();
    const ref = firebase.storage().ref("image/" + currentUser.uid);
    var state;
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/cars`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const cars = _.map(state, (val, uid) => {
          return { ...val, uid };
        });
        this.setState({
          cars: cars,
        });
      });
  }

  async componentDidMount() {
    this.getPermissionAsync();
    const { currentUser } = firebase.auth();
    const ref = firebase.storage().ref("image/" + currentUser.uid);
    var state;
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/cars`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const cars = _.map(state, (val, uid) => {
          return { ...val, uid };
        });
        this.setState({
          cars: cars,
        });
      });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upperView: {
    flexDirection: "row",
    flex: 1,
    height: 100,
    width: 100,
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
    fontWeight: "bold",
    color: "#7D0036",
  },
});
