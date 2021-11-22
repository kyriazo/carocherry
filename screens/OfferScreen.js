import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Switch,
  Picker,
  ScrollView,
  TextInput,
  Modal,
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PushNotificationIOS,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaceRender from "../components/PlaceRender";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { CurrentRenderContext } from "@react-navigation/native";
import CounterInput from "react-native-counter-input";

export default class OfferScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        originPlace: '',
        originName: '',
        destinationPlace: '',
        destinationName: '',
        date: new Date(),
        mode: 'date',
        show: false,
        fromModal: false,
        toModal: false,
        originStatus: '',
        destinationStatus: '',
        checked: 'first',
        isOffer: 'true',
        seats: null,
        smokingAllow: false,
        musicAllow: false,
        petsAllow: false
    };
}

showFromModal = () => {
  this.setState({ fromModal: true });
};

showToModal = () => {
  this.setState({ toModal: true });
};

onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  this.setState({
    show: Platform.OS === 'ios',
    date: currentDate
});
};

showModal = (currentMode) => {
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

toggleSmoking = () => {
  this.setState({
   smokingAllow: !this.state.smokingAllow
  })
}

toggleMusic = () => {
  this.setState({
    musicAllow: !this.state.musicAllow
  })
}

togglePets = () => {
  this.setState({
    petsAllow: !this.state.petsAllow
  })
}

  render() {
    return (
     
      <View>
        <Text style={{   fontSize: 24,
        paddingTop: 0,
        fontWeight: "bold",
        paddingBottom: 5,
        backgroundColor: '#f3e1d6',
        // paddingLeft: 10
       }}>Ride Details</Text>
       
        <View style={styles.container}>
        <TouchableOpacity onPress={this.showFromModal}>
        <Text>From {this.state.originName}</Text>
        </TouchableOpacity>
        <Modal visible={this.state.fromModal} animationType="slide">
          <GooglePlacesAutocomplete
            suppressDefaultStyles
            styles={{
              textInput: styles.TextInput,
              container: {
                position: 'absolute',
                top: 0,
                left: 10,
                right: 10,
                //zIndex: 100, // works on ios
                //elevation: 100 // works on android
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
              originPlace: { value: {data, details}},
              fromModal: false,
            });   
            this.setState({
              originName: this.state.originPlace.value.data.description
            })
          }}
      fetchDetails
            query={{
            key: 'AIzaSyClWDkDCABZp_zXKkYVw3barMfvWVySPE0',
            language: 'en',
          }}
          renderRow={(data: GooglePlaceData) => <PlaceRender data={data} />}
        />
       </Modal>
       <TouchableOpacity onPress={this.showToModal}>
        <Text>To {this.state.destinationName}</Text>
        </TouchableOpacity>
        <Modal visible={this.state.toModal} animationType="slide">
          <GooglePlacesAutocomplete
            suppressDefaultStyles
            styles={{
              textInput: styles.TextInput,
              container: {
                position: 'absolute',
                top: 50,
                left: 10,
                right: 10,
                //zIndex: 100, // works on ios
                //elevation: 100, // works on android
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
              destinationPlace: { value: {data, details}},
              toModal: false,
            });   
            this.setState({
              destinationName: this.state.destinationPlace.value.data.description
            })
          }}
      fetchDetails
            query={{
            key: 'AIzaSyClWDkDCABZp_zXKkYVw3barMfvWVySPE0',
            language: 'en',
          }}
          renderRow={(data: GooglePlaceData) => <PlaceRender data={data} />}
        />
        </Modal>
          <View style={styles.dateContainer}>
          <View>
        <TouchableOpacity style={styles.dateButton}onPress={this.showDatepicker} title="Date">
          <Text>Date</Text>
        </TouchableOpacity> 
        <Ionicons name="time-outline" size={24} color="black" />
      </View>
      <View>
     
      <TouchableOpacity style={styles.dateButton}onPress={this.showTimepicker} title="Date">
          <Text>Time</Text>
      </TouchableOpacity> 
      <Fontisto name="date" size={24} color="black" />
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
        <Text>{this.state.date.toString()}</Text>
         </View>
        
         <View style={styles.prefContainer}>
         <Text style={{   fontSize: 24,
        paddingTop: 0,
        fontWeight: "bold",
        paddingBottom: 5,
        backgroundColor: '#f3e1d6',
        // paddingLeft: 10
       }}>Ride Information</Text>
           <Text>Are you offering or requesting?</Text>
           <View style={{ flexDirection: 'row' }}>
           <RadioButton
              value="first"
              status={ this.state.checked === 'first' ? 'checked' : 'unchecked' }
              onPress={() => this.setState({ checked: 'first', isOffer: true })}
           /> 
           <Text>Offering</Text>
           </View>
           
           <View style={{ flexDirection: 'row' }}>
            
          <RadioButton
              value="second"
              status={ this.state.checked === 'second' ? 'checked' : 'unchecked' }
              onPress={() => this.setState({ checked: 'second', isOffer: false })}
          />
           <Text>Requesting</Text>
          </View>
          
            <Text>How many seats?</Text>
           

            <CounterInput
              horizontal = 'true'
              onIncreasePress ={() => {
              const counter = this.state.seats + 1;
              this.setState({ seats: counter})
             }}
             onDecreasePress = {() => {
              const counter = this.state.seats - 1;
              if (counter < 0) {
                console.log('stop')
                return 0;
              }
              else
              this.setState({ seats: counter})
             }}
            />
           <Text>Is smoking allowed?</Text>
           <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.smokingAllow ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSmoking}
              value={this.state.smokingAllow}
            />
           <Text>Music?</Text>
           <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.musicAllow ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleMusic}
              value={this.state.musicAllow}
            />

           <Text>Are pets welcome?</Text>
          
           <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.petsAllow ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.togglePets}
              value={this.state.petsAllow}
            />
           </View>
           
           <View style={{ flexDirection: 'row' }}>
          
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
                 if (this.state.originStatus == '' || this.state.destinationStatus == '')                
                 return
                 else
                 this.props.navigation.navigate("Route", { state: this.state })
          }}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Next</Text>
        </TouchableOpacity>
       
        </View>
      </View>
     

         
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f3e1d6',
    height: '100%',
  },
  dateContainer: {
    padding: 15,
    flexDirection: 'row',
    position: 'absolute',
    top: 100
  },
  prefContainer: {
    position: 'absolute',
    top: 180
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
  dateButton: {
    backgroundColor: "#E9446A",
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  }
});
