import _ from "lodash";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Permissions from "expo-permissions";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from 'react-native-maps-directions';
//import Geolocation from '@react-native-community/geolocation';
import * as firebase from "firebase";


export default class RouteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       origin: { latitude: this.props.route.params.state.originPlace.value.details.geometry.location.lat, longitude: this.props.route.params.state.originPlace.value.details.geometry.location.lng},
       originName: this.props.route.params.state.originPlace.value.data.description,
       destination: { latitude: this.props.route.params.state.destinationPlace.value.details.geometry.location.lat, longitude: this.props.route.params.state.destinationPlace.value.details.geometry.location.lng},
       destinationName: this.props.route.params.state.destinationPlace.value.data.description,
       date: this.props.route.params.state.date.toLocaleString(),
       isOffer: this.props.route.params.state.isOffer,
       petsAllow: this.props.route.params.state.petsAllow,
       musicAllow: this.props.route.params.state.musicAllow,
       smokingAllow: this.props.route.params.state.smokingAllow,
       luggageAllow: this.props.route.params.state.luggageAllow,
       seats: this.props.route.params.state.seats
    };
}


    async ComponentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status != 'granted') {
      const respoonse = await Permissions.askAsync(Permissions.LOCATION)
    }
  }
 

consoleInfo = () => {  
    // console.log(this.state);
}

uploadRoute = () => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/rides/`).push({
        destination: this.state.destination,
        destinationName: this.state.destinationName,
        origin: this.state.origin,
        originName: this.state.originName,
        uid: currentUser.uid,
        date: this.state.date,
        isOffer: this.state.isOffer,
        petsAllow: this.state.petsAllow,
        musicAllow: this.state.musicAllow,
        smokingAllow: this.state.smokingAllow,
        luggageAllow: this.state.luggageAllow,
        seats: this.state.seats,
        seatLimit: this.state.seats,
    });
        this.props.navigation.navigate("Home")
    }

  render() {
    return (
   <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='always' 
      listViewDisplayed={false}
      >
      <SafeAreaView>
        <View style={styles.container}>
        <View style={styles.mapContainer}>
        <MapView
        provider={PROVIDER_GOOGLE}
        style = {{ flex: 1}}
        initialRegion = {{
          latitude: this.props.route.params.state.originPlace.value.details.geometry.viewport.northeast.lat,
          longitude: this.props.route.params.state.originPlace.value.details.geometry.viewport.northeast.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >      
  <MapViewDirections
    lineDashPattern={[0]}
    origin={this.state.origin}
    destination={this.state.destination}
    apikey='AIzaSyClWDkDCABZp_zXKkYVw3barMfvWVySPE0'
    strokeWidth={5}
    strokeColor="black"
  />
      </MapView>      
      
        </View>

 <View style={{ flex: 1 }}>

                        <Text>Confirm your preferences</Text>
                        <Text>From {this.state.originName}</Text>
                        <Text>To {this.state.destinationName}</Text>
                        <Text>{this.state.date}</Text>
                        <Text>Is it an offer = {this.state.isOffer}</Text>
                        <Text>Seats available: {this.state.seats}</Text>
                        <Text>Smoking allowed = {this.state.smokingAllow.toString()}</Text>
                        <Text>Music allowed = {this.state.musicAllow.toString()}</Text>
                        <Text>Pets allowed = {this.state.petsAllow.toString()}</Text>
                        <Text>Luggage allowed = {this.state.luggageAllow.toString()}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.uploadRoute}>
                                <Text style={{ color: "#FFF", fontWeight: "500" }}>Offer Ride</Text>
                        </TouchableOpacity> 
                </View>
        </View>
      </SafeAreaView>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
  },
  mapContainer: {
    //height: 50,
    padding: 0,
    justifyContent: 'center',
    alignContent: 'center',
    height: '50%'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  }
});
