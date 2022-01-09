import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyRidesRender from "../components/MyRidesRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

export default class MyRidesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        //destination: { latitude: this.props.navigation.state.params.state.destinationPlace.value.details.geometry.location.latitude, longitude: this.props.navigation.state.params.state.destinationPlace.value.details.geometry.location.longitude},
        //origin: { latitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.location.latitude, longitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.location.longitude},
        count: 0
    };
    
toggleLuggage = (ruid) => {
    console.log(ruid);
}

  }
  render() {
    return (   
   
        <View> 
        <Text style={styles.textTitles}>Matched results</Text>
        <FlatList
        
          data={this.state.rides}
          renderItem={({ item }) => {

            const { currentUser } = firebase.auth();
            if (currentUser.uid == item.uid)
            return (
              <View>
                 <MyRidesRender value={item} />
                  <TouchableOpacity
                    onPress={() => {
                    firebase.database().ref(`/rides/${item.ruid}`).remove();
                    }
                    }
                  >
                   <Text style={styles.deleteText}>Delete this Ride</Text>
                  </TouchableOpacity>
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