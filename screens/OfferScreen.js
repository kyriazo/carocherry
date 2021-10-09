import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaceRender from "../components/PlaceRender";
import DateTimePicker from '@react-native-community/datetimepicker';


export default class OfferScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        originPlace: '',
        destinationPlace: '',
        date: new Date(),
        mode: 'date',
        show: false
    };
}

onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  this.setState({
    show: Platform.OS === 'ios',
    date: currentDate
});
};

showMode = (currentMode) => {
  this.setState({
    show: true
});
this.setState({
  mode: currentMode
});
};

showDatepicker = () => {
  this.showMode('date');
};

showTimepicker = () => {
  this.showMode('time');
};

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
          <View style={styles.dateContainer}>
          <View>
      <View>
        <Button onPress={this.showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={this.showTimepicker} title="Show time picker!" />
      </View>
      {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
    </View>   
         </View>
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
  dateContainer: {
    position: 'absolute',
    top: 100
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
