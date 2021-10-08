import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Touchable,
} from "react-native";
import ProfileRender from "../components/ProfileRender";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { FlatList, TapGestureHandler } from "react-native-gesture-handler";
 

export default class ResultsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        //destination: { latitude: this.props.navigation.state.params.state.destinationPlace.value.details.geometry.location.latitude, longitude: this.props.navigation.state.params.state.destinationPlace.value.details.geometry.location.longitude},
        //origin: { latitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.location.latitude, longitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.location.longitude},
        count: 0
    };
    
  }

  consoleInfo = () => {
   console.log(this.props.navigation.state.params.state.originPlace.value.details.geometry.location.lat);
   console.log(this.props.navigation.state.params.state.originPlace.value.details.geometry.location.lng);

}

  render() {
    return (   
   
        <View> 
        <Text style={styles.textTitles}>Matched results</Text>
        <FlatList
        
          data={this.state.rides}
          renderItem={({ item }) => {
            const lat1 = this.props.navigation.state.params.state.originPlace.value.details.geometry.location.lat;
              const lat2 = item.origin.latitude;
              const lon1 = this.props.navigation.state.params.state.originPlace.value.details.geometry.location.lng;
              const lon2 = item.origin.longitude;
              const R = 6371e3; // metres
              const φ1 = lat1 * Math.PI/180; // φ, λ in radians
              const φ2 = lat2 * Math.PI/180;
              const Δφ = (lat2-lat1) * Math.PI/180;
              const Δλ = (lon2-lon1) * Math.PI/180;
          
              const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              const d = R * c; // in metres
              if (d < 1000)  
            return (
            
                <ProfileRender value={item} />
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
});