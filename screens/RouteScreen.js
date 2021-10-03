import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  TextInput,
  Modal,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { withNavigation } from 'react-navigation';
import ProfileInput from "../components/ProfileInput";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { FlatList, TapGestureHandler } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from 'react-native-maps-directions';
//import Geolocation from '@react-native-community/geolocation';


export default class RouteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       origin: { latitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.location.lat, longitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.location.lng},
       destination: { latitude: this.props.navigation.state.params.state.destinationPlace.value.details.geometry.location.lat, longitude: this.props.navigation.state.params.state.destinationPlace.value.details.geometry.location.lng},
    };
}


    async ComponentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status != 'granted') {
      const respoonse = await Permissions.askAsync(Permissions.LOCATION)
    }
  }
 

consoleInfo = () => {
    
    console.log(this.props);
    //console.log(this.props.navigation.state.params.state.destinationPlace.value.details);
}


  render() {
    return (

      <SafeAreaView>
        <View style={styles.container}>


        <MapView
        provider={PROVIDER_GOOGLE}
        style = {{ flex: 1}}
        initialRegion = {{
          latitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.viewport.northeast.lat,
          longitude: this.props.navigation.state.params.state.originPlace.value.details.geometry.viewport.northeast.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        
       
  <MapViewDirections
    origin={this.state.origin}
    destination={this.state.destination}
    apikey={'AIzaSyClWDkDCABZp_zXKkYVw3barMfvWVySPE0'}
    strokeWidth={5}
    strokeColor="black"
  />

      </MapView>   
        
        <TouchableOpacity style={styles.button} onPress={() => this.consoleInfo()}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>LOG</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Confirm", { state: this.state })}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Next</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
    height: '100%'
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
