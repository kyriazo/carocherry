import _ from "lodash";
import React from "react";
import {
  Modal,
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
       date: this.props.route.params.state.showDate,
       isOffer: this.props.route.params.state.isOffer,
       petsAllow: this.props.route.params.state.petsAllow,
       musicAllow: this.props.route.params.state.musicAllow,
       smokingAllow: this.props.route.params.state.smokingAllow,
       luggageAllow: this.props.route.params.state.luggageAllow,
       seats: this.props.route.params.state.seats,
       extraInf: this.props.route.params.state.extraInf,
       modal: false
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

goHome = () => {  
  this.props.navigation.popToTop();
  this.props.navigation.navigate("Rides")
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
        extraInf: this.state.extraInf
    });
        //this.props.navigation.navigate("Home")
        this.setState({
          modal: true
        })
    }

  render() {
    return (
   <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='always' 
      listViewDisplayed={false}
      >
      <View style={styles.containerView}>
      {/* <SafeAreaView
      > */}
      <Text style={styles.textTitle}>Suggested Route Preview</Text>
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
        <Modal  visible={this.state.modal} transparent={true} backdropOpacity={90} backdropColor={'#333333'} animationType="slide">
        <View style={styles.modal}>
            <Text style={styles.modalText}>Congratulations. Your ride has been successfuly registered on Carocherry!</Text>
            <TouchableOpacity style={styles.button} onPress={this.goHome}>
                                <Text style={{ color: "#FFF", fontWeight: "500" }}>Return to Rides</Text>
        </TouchableOpacity> 
        </View>
        </Modal>
 <ScrollView style={styles.prefView}>

                        <Text style={styles.textLabel}>Confirm your preferences</Text>
                        <Text style={styles.preferenceText}>From: <Text style={styles.preferenceValue}>{this.state.originName}</Text></Text>
                        <Text style={styles.preferenceText}>To: <Text style={styles.preferenceValue}>{this.state.destinationName}</Text></Text>
                        <Text style={styles.preferenceText}>Date: <Text style={styles.preferenceValue}>{this.state.date}</Text></Text>
                        <Text style={styles.preferenceText}>Ride type: <Text style={styles.preferenceValue}>{this.state.isOffer ? 'Offer' : 'Request'}</Text></Text>
                        <Text style={styles.preferenceText}>Available seats: <Text style={styles.preferenceValue}>{this.state.seats}</Text></Text>

                        <Text style={styles.preferenceText}>Smoking: <Text style={styles.preferenceValue}>{this.state.smokingAllow ? 'Allowed' : 'Not allowed'}</Text></Text>
                        <Text style={styles.preferenceText}>Music: <Text style={styles.preferenceValue}>{this.state.musicAllow ? 'Welcome' : 'Not prefered'}</Text></Text>
                        <Text style={styles.preferenceText}>Pets: <Text style={styles.preferenceValue}>{this.state.petsAllow ? 'Welcome' : 'Not welcome'}</Text></Text>
                        <Text style={styles.preferenceText}>Luggage space: <Text style={styles.preferenceValue}>{this.state.luggageAllow ? 'Yes' : 'No'}</Text></Text>
                        <Text style={styles.preferenceText}>Extra Information: <Text style={styles.preferenceValue}>{this.state.extraInf}</Text></Text>
                </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.uploadRoute}>
                                <Text style={{ color: "#FFF", fontWeight: "500" }}>Offer Ride</Text>
        </TouchableOpacity> 
      {/* </SafeAreaView>  */}
      </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e1d6',
    height: '100%',
    flex: 1
  },
  containerView: {
    backgroundColor: '#f3e1d6',
    height: '100%',
    flex: 1
  },
  prefView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingBottom: 20
  },
  textTitle: {
    textAlignVertical: 'center',
    fontSize: 24,
    paddingVertical: 15,
    paddingLeft: 10,
    fontWeight: 'bold',
    // height: '100%'
    marginTop: 40
  },
  mapContainer: {
    //height: 50,
    padding: 0,
    justifyContent: 'center',
    alignContent: 'center',
    height: '40%'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 'auto',
    marginBottom: 10
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  textLabel: {
    // paddingLeft: 10,
    // paddingVertical: 15,
    // fontSize: 16,
    // fontWeight: 'bold'
    paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7D0036'
  },
  preferenceText: {
    paddingLeft: 10,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7D0036'

  },
  preferenceValue: {
    fontWeight: 'normal',
    color: '#000000',
    fontSize: 16
  },
  modalText: {
    paddingLeft: 10,
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
    alignContent: 'center'
  },
  modal: {
    marginTop: '60%',
    marginHorizontal: '5%',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  
  }
});