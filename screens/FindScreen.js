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
import PlaceRender from "../components/PlaceRender";

export default class FindScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        originPlace: '',
        destinationPlace: '',
        orignStatus: '',
        destinationStatus: ''
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
            suppressDefaultStyles
            styles={{
              textInput: styles.TextInput,
              container: {
                position: 'absolute',
                top: 0,
                left: 10,
                right: 10,
              },
              listView: {
                position: 'absolute',
                top: 105,
              },
              separator: {
                backgroundColor: 'grey',
                height: 1
              }
            }}
            placeholder='Where from?'
            textInputProps={{
              onChangeText: (text) => { this.setState({originStatus: text}) }
             }}
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
          renderRow={(data: GooglePlaceData) => <PlaceRender data={data} />}
        />
          <GooglePlacesAutocomplete
            suppressDefaultStyles
            styles={{
              textInput: styles.TextInput,
              container: {
                position: 'absolute',
                top: 50,
                left: 10,
                right: 10,
              },
              listView: {
                position: 'absolute',
                top: 105,
              },
              separator: {
                backgroundColor: 'grey',
                height: 1
              }
            }}
            placeholder='Where to?'
            textInputProps={{
              onChangeText: (text) => { this.setState({destinationStatus: text}) }
             }}
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
          renderRow={(data: GooglePlaceData) => <PlaceRender data={data} />}
        />
  
        <TouchableOpacity style={styles.button} onPress={() => {
                 if (this.state.originStatus == '' || this.state.destinationStatus == '')                
                 return
                 else
                 this.props.navigation.navigate("Results", { state: this.state })
          }}>
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
    position: 'absolute',
    bottom: 50,
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
