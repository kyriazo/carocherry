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


export default class FindScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      rides:[]
    };
    
  }


  consoleLog = () => {
    console.log(this.state);
  };



  render() {
    return (
      <View>
 
        <TouchableOpacity style={styles.button} onPress={this.consoleLog}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Log</Text>
        </TouchableOpacity>
        

        <FlatList
        
          data={this.state.rides}
          renderItem={({ item }) => {
            return (
              <View style={styles.upperView}>
                <Text style={styles.textTitles}>
                    {item.uid}
                </Text>
                <View  style={styles.textTitles}>
                  <TouchableOpacity
                   
                    onPress={() => this.carDelete(item.uid)}
                  >
                    <AntDesign name="doubleright" size={24} color="black" />
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
      .ref(`/rides`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const rides = _.map(state, (val, key) => {
          return { ...val, key};
        });
        this.setState({
          rides: rides,
          key: key
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
      .ref(`/rides`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const rides = _.map(state, (val, key) => {
          return { ...val, key};
        });
        this.setState({
          rides: rides,
          key: key
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
