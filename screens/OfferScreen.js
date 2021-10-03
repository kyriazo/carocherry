import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import Geolocation from 'react-native-community/geolocation';
//navigator.geolocation = require('@react-native-community/geolocation');


export default class OfferScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        originPlace: '',
        destinationPlace: '',
    };
}

fromTextHandler = (fromText) => {
  this.setState({
      fromText: fromText
  });
}

destinationTextHandler = (destinationText) => {
  this.setState({
      destinationText: destinationText
  });
}

consoleInfo = () => {
    console.log(this.props);
    console.log(this.state);
}


  render() {
    return (

      <SafeAreaView>
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            styles={{
              textInput: styles.TextInput,
            }}
            placeholder='Where from?'
            onPress={(data, details = null) => {
              this.setState({
              originPlace: { value: {data, details}}
            });   
          }}
      fetchDetails
            query={{
            key: 'AIzaSyClWDkDCABZp_zXKkYVw3barMfvWVySPE0',
            language: 'en',
          }}
        />
          <GooglePlacesAutocomplete
            styles={{
              textInput: styles.TextInput,
            }}
            placeholder='Where to?'
            onPress={(data, details = null) => {
              this.setState({
              destinationPlace: { value: {data, details}}
            });   
          }}
      fetchDetails
            query={{
            key: 'AIzaSyClWDkDCABZp_zXKkYVw3barMfvWVySPE0',
            language: 'en',
          }}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.consoleInfo()}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>log</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Route", { state: this.state })}>
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
