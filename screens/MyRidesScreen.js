import _ from "lodash";
import React from "react";
import {
FlatList,
ScrollView,
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MyRidesRender from "../components/MyRidesRender";
import RequestRender from "../components/RequestRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

export default class MyRidesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myRideId: ''
    };

  }
  render() {
    return (   
        <ScrollView>
        <View> 
        <Text style={styles.textTitles}>My Rides</Text>
        <FlatList
          data={this.state.rides}
          keyExtractor={(item, index) => item.ruid}
          key={(item, index) => item.ruid}
          renderItem={({ item }) => {
            const { currentUser } = firebase.auth();
            if (currentUser.uid == item.uid)
            return (
              <View>
                 <MyRidesRender value={item} />
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Are you sure you want to delete this ride?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => 
                            {firebase.database().ref(`/rides/${item.ruid}`).remove();}
                        }
                        ]
                      );
                    }
                    }
                  >
                   <Text style={styles.deleteText}>Delete this Ride</Text>
                  </TouchableOpacity>
              </View>
            );
          }}
           
        />

<Text style={styles.textTitles}>My Requests</Text>
<FlatList
        data={this.state.rides}
        keyExtractor={(item, index) => item.ruid}
        // key={(item, index) => item.ruid}
        renderItem={({ item }) => {
          const { currentUser } = firebase.auth(); 
          var answers = item.requests;  
          if (item.requests == null)
          return
          const result = Object.values(answers);   
          const rideId = result.map((data) => data.rideId);
          const userId = result.map((data) => data.uid);
          for (var i=0; i < rideId.length; i++)
          if (rideId[i] == item.ruid)
          for (var j=0; j < userId.length; j++)
          if (userId[j] == currentUser.uid)
          return (
            <View>
               <RequestRender value={item} />
              
            </View>
           
          );
        }}
      />
      </View>
      </ScrollView>      
    );
  }
  

  async componentDidUpdate() {
    this.getPermissionAsync();
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
    position: 'absolute',
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    top: 50,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitles: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7D0036",
  },
  deleteText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7D0036",
  }
});