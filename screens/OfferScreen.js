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
import PlaceRender from "../components/PlaceRender";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FAB, RadioButton } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import RouteScreen from './RouteScreen'
import { createStackNavigator } from '@react-navigation/stack';


const RouteStack = createStackNavigator();

const RouteStackNavigator = () => {
  return(
  <RouteStack.Navigator initialRouteName="Route" screenOptions={{
    headerStyle: {
      elevation: 0,
      backgroundColor: '#dd5b45',
    },
    headerTitleStyle: {
      color:'white',
      fontSize: 26
    },
    headerTintColor: 'white',
    cardStyle: {backgroundColor: '#ffffff'}}}>
    <RouteStack.Screen name="Route" component={RouteScreen}/>
  </RouteStack.Navigator>
  )
}

export default class OfferScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        originPlace: '',
        originName: 'Select Departure',
        destinationPlace: '',
        destinationName: 'Select Destination',
        date: new Date(),
        showDate: 'Select Date',
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

componentDidMount() {

}



//Toggles modals on
showFromModal = () => {
  this.setState({ fromModal: true });
};

showToModal = () => {
  this.setState({ toModal: true });
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

//Sets date to state
onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  this.setState({
    show: Platform.OS === 'ios',
    date: currentDate
});
   selectedDate = selectedDate.toString().split(' ');
   var dateTime = selectedDate[4].split(':');
   selectedDate=selectedDate[0]+' '+selectedDate[1]+' '+selectedDate[2] + ' ' +dateTime[0]+ ':'+dateTime[1];
   console.log(selectedDate);
   this.setState({
     showDate: selectedDate
   })
};

setSeats = (value) => {
  this.setState({seats: value})
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
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('black',true);
    return ( 
      <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='always' 
      listViewDisplayed={false}
      >
      <View style={{flex:1}}> 
        <View style={styles.container}>
        {/* <TouchableOpacity onPress={this.showFromModal}> */}
        {/* <Text style={styles.textInput}>{this.state.originName}</Text> */}
        {/* <Modal visible={this.state.fromModal} animationType="slide"> */}
          <GooglePlacesAutocomplete
            suppressDefaultStyles
            styles={{
              textInput: {
                backgroundColor: '#ffffff',
                borderBottomColor: "#8A8F9E",
                height: 50,
                fontSize: 18,
                color: "black",
                backgroundColor: 'white',
                paddingLeft: 15,
                textAlignVertical: 'center',
                borderRadius: 10
              },
              container: {
                marginTop: 15,
                borderRadius: 10,
                backgroundColor: '#ffffff'
              },
              listView: {
              },
              separator: {
                backgroundColor: 'grey',
                height: 1
              }
            }}
            placeholder='Select Departure'
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
       {/* </Modal> */}
       {/* <TouchableOpacity onPress={this.showToModal}>
       <Text style={styles.textInput}>{this.state.destinationName}</Text>
        </TouchableOpacity>
        <Modal visible={this.state.toModal} animationType="slide"> */}
          <GooglePlacesAutocomplete
            suppressDefaultStyles
            styles={{
              textInput: {
                backgroundColor: '#ffffff',
                borderBottomColor: "#8A8F9E",
                height: 50,
                fontSize: 18,
                color: "black",
                backgroundColor: 'white',
                paddingLeft: 15,
                textAlignVertical: 'center',
                borderRadius: 10
              },
              container: {
                marginTop: 15,
                borderRadius: 10,
                backgroundColor: '#ffffff'
              },
              listView: {
              },
              separator: {
                backgroundColor: 'grey',
                height: 1
              }
            }}
            placeholder='Select destination'
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
        {/* </Modal> */}
       
          <View style={styles.dateContainer}>
          <Text style={styles.dateTextInput}>{this.state.showDate}</Text>

        
      <View>
     
      <TouchableOpacity style={styles.dateButton} onPress={this.showDatepicker} title="Date">
      <Fontisto name="date" size={24} color="black" />
      </TouchableOpacity> 
    
      </View>

      <View>
        <TouchableOpacity style={styles.dateButton} onPress={this.showTimepicker} title="Date">
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
          <View style={styles.offerContainer}>
           <View style={{ flexDirection: 'row' }}>
           <RadioButton
              value="first"
              status={ this.state.checked === 'first' ? 'checked' : 'unchecked' }
              onPress={() => this.setState({ checked: 'first', isOffer: true })}
           /> 
           <Text style={styles.offerText}>Offering</Text>
           </View>
           
           <View style={{ flexDirection: 'row' }}>
            
          <RadioButton
              value="second"
              status={ this.state.checked === 'second' ? 'checked' : 'unchecked' }
              onPress={() => this.setState({ checked: 'second', isOffer: false })}
          />
           <Text style={styles.offerText}>Requesting</Text>
          </View>
          </View>
            <Text style={styles.textTitles}>How many seats?</Text>
            <View style={styles.picker}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.seats}
              onValueChange={(itemValue, itemIndex) => this.setState({seats: itemValue})}
            >
               <Picker.Item label="Choose seats" value="0"></Picker.Item>
               <Picker.Item label="1" value="1"></Picker.Item>
               <Picker.Item label="2" value="2"></Picker.Item>
               <Picker.Item label="3" value="3"></Picker.Item>
            </Picker>
            </View>
          <Text style={styles.textTitles}>Extra ride options</Text>
           <View style={styles.switchStyle}>
           <Switch
              trackColor={{ false: "#aaaaaa", true:  "#E9446A" }}
              thumbColor={this.state.smokingAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSmoking}
              value={this.state.smokingAllow}
            />
             <Text style={styles.switchText}>Smoking allowed</Text>
            {/* <Text>Smoking is fine</Text> */}
           </View>
           
           {/* <Text style={styles.textTitles}>Music?</Text> */}
           <View style={styles.switchStyle}>
           <Switch
              trackColor={{ false: "#aaaaaa", true:  "#E9446A" }}
              thumbColor={this.state.musicAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleMusic}
              value={this.state.musicAllow}
            />
             <Text style={styles.switchText}>Music is welcome</Text>
            {/* <Text>I like music</Text> */}
            </View>
           {/* <Text style={styles.textTitles}>Are pets welcome?</Text> */}
           <View style={styles.switchStyle}>
           <Switch
              trackColor={{ false: "#aaaaaa", true:  "#E9446A" }}
              thumbColor={this.state.petsAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.togglePets}
              value={this.state.petsAllow}
            />
            <Text style={styles.switchText}>Pets allowed</Text>
             {/* <Text>Pets welcome</Text> */}
            </View>
           
            {/* <Text style={styles.textTitles}>Room for luggage?</Text> */}
           <View style={styles.switchStyle}>
           <Switch
              trackColor={{ false: "#aaaaaa", true:  "#E9446A" }}
              thumbColor={this.state.petsAllow ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleLuggage}
              value={this.state.luggageAllow}
            />
            <Text style={styles.switchText}>Luggage space</Text>
             {/* <Text>There is enough room</Text> */}
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
                 this.props.navigation.navigate("Route", {state: this.state })
                 
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
    paddingHorizontal: 15
  },
  dateContainer: {
    padding: 0,
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  prefContainer: {
  },
  offerContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
  offerText: {
    textAlignVertical: 'center'
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  button: {
    //bottom: 50,
    width: '100%',
    //marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 'auto'
  },
  dateButton: {
    marginLeft: 15,
    padding: 10,
    // backgroundColor: "#E9446A",
  },
  textInput: {
    borderBottomColor: "#8A8F9E",
    height: 50,
    fontSize: 18,
    color: "black",
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: 'white',
    paddingLeft: 15,
    textAlignVertical: 'center',
  },
  dateTextInput: {
    borderBottomColor: "#8A8F9E",
    height: 50,
    fontSize: 18,
    color: "black",
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 15,
    textAlignVertical: 'center'
  },
  textTitles: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7D0036'
},
  switchStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  switchText: {
    width: '35%',
    fontSize: 16,
    marginLeft: 10
  }
});