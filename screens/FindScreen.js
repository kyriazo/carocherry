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
import ProfileRender from "../components/ProfileRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { FlatList, TapGestureHandler } from "react-native-gesture-handler";
 

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
              <View>
               
               <ProfileRender value={item} />
                    
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
        const rides = _.map(state, (val, ruid) => {
          return { ...val, ruid};
        });
        this.setState({
          rides: rides,
        });
      });
  }

  async componentDidMount() {
    this.getPermissionAsync();
    const { currentUser } = firebase.auth();
    var state;
    firebase
      .database()
      .ref(`/rides`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const rides = _.map(state, (val, ruid) => {
          return { ...val, ruid};
        });
        this.setState({
          rides: rides,
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
    fontSize: 5
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
    fontSize: 5,
    fontWeight: "bold",
    color: "#7D0036",
  },
});