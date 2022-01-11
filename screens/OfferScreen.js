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
import { FAB, RadioButton } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { CurrentRenderContext } from "@react-navigation/native";
import CounterInput from "react-native-counter-input";

export default class OfferScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        originPlace: '',
        originName: 'Where from?',
        destinationPlace: '',
        destinationName: 'Where to?',
        date: new Date(),
        mode: 'date',
        show: false,
        fromModal: false,
        toModal: false,
        originStatus: '',
        destinationStatus: '',
        checked: 'first',
        isOffer: 'true',
        seats: 0,
        smokingAllow: true,
        musicAllow: true,
        petsAllow: true,
        luggageAllow: true,
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

setSeats = (value) => {
  this.setState({seats: value})
  console.log(this.state.seats);
}

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

toggleLuggage = () => {
  this.setState({
    luggageAllow: !this.state.luggageAllow
  })
}

  render() {
    return ( 
      <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='always' 
      listViewDisplayed={false}
      >
      <View style={{flex:1}}> 
        <View style={styles.container}>
        <TouchableOpacity onPress={this.showFromModal}>
        <Text style={styles.textInput}>{this.state.originName}</Text>
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
       <Text style={styles.textInput}>{this.state.destinationName}</Text>
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
          <Text style={styles.textInput}>{this.state.date.toUTCString()}</Text>

        
      <View>
     
      <TouchableOpacity style={styles.dateButton} onPress={this.showTimepicker} title="Date">
      <Fontisto name="date" size={24} color="black" />
      </TouchableOpacity> 
    
      </View>

      <View>
        <TouchableOpacity style={styles.dateButton} onPress={this.showDatepicker} title="Date">
        <Ionicons name="time-outline" size={24} color="black" />
        </TouchableOpacity> 
        
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
        
         <View style={styles.prefContainer}>
      
          <Text style={styles.textTitles}>Are you offering or requesting?</Text>
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
          
            <Text style={styles.textTitles}>How many seats?</Text>
            <Picker
              selectedValue={this.state.seats}
              onValueChange={(itemValue, itemIndex) => this.setState({seats: itemValue})}
            >
               <Picker.Item label="Choose seats" value="0"></Picker.Item>
               <Picker.Item label="1" value="1"></Picker.Item>
               <Picker.Item label="2" value="2"></Picker.Item>
               <Picker.Item label="3" value="3"></Picker.Item>
            </Picker>
          <Text style={styles.textTitles}>Is smoking allowed?</Text>
           <View style={styles.switchStyle}>
           <Text>No smoking please</Text>
           <Switch
              trackColor={{ false: "#ff0000", true:  "#00ff00" }}
              thumbColor={this.state.smokingAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSmoking}
              value={this.state.smokingAllow}
            />
            <Text>Smoking is fine</Text>
           </View>
           
           <Text style={styles.textTitles}>Music?</Text>
           <View style={styles.switchStyle}>
           <Text>I prefer silence</Text>
           <Switch
              trackColor={{ false: "#ff0000", true:  "#00ff00" }}
              thumbColor={this.state.musicAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleMusic}
              value={this.state.musicAllow}
            />
            <Text>I like music</Text>
            </View>
           <Text style={styles.textTitles}>Are pets welcome?</Text>
           <View style={styles.switchStyle}>
             <Text>No pets please</Text>
           <Switch
              trackColor={{ false: "#ff0000", true:  "#00ff00" }}
              thumbColor={this.state.petsAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.togglePets}
              value={this.state.petsAllow}
            />
             <Text>Pets welcome</Text>
            </View>
           
            <Text style={styles.textTitles}>Room for luggage?</Text>
           <View style={styles.switchStyle}>
             <Text>No room for luggage</Text>
           <Switch
              trackColor={{ false: "#ff0000", true:  "#00ff00" }}
              thumbColor={this.state.petsAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleLuggage}
              value={this.state.luggageAllow}
            />
             <Text>There is enough room</Text>
            </View> 
           
           </View>
           
           <View style={{ flexDirection: 'row' }}>
          
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
                if (this.state.originStatus == '' || this.state.destinationStatus == ''){
                  alert("Please specify your route");
                  return
                  }
                if (this.state.seats == 0) {
                 alert("Please specify available seats");
                 return 
                 }
                 else
                 this.props.navigation.navigate("Route", { state: this.state })
                 
          }}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Next</Text>

              
        </TouchableOpacity>
     
        </View>

       
      </View>
      </ScrollView>
      
         
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
    padding: 0,
    flexDirection: 'row',
  },
  prefContainer: {
    
  },
  button: {
    //bottom: 50,
    width: 100,
    //marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    marginLeft: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  dateButton: {
    marginLeft: 15,
    padding: 10,
    //backgroundColor: "#E9446A",
  },
  textInput: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  textTitles: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7D0036'
},
  switchStyle:{
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
});