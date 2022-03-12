import _ from "lodash";
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaceRender from "../components/PlaceRender";
import { StatusBar } from 'react-native';
import ResultsScreen from './ResultsScreen';
import { createStackNavigator } from '@react-navigation/stack';



const ResultsStack = createStackNavigator();

const ResultsStackNavigator = () => {
  return(
  <ResultsStack.Navigator initialRouteName="Results" screenOptions={{
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
    <ResultsStack.Screen name="Results" component={ResultsScreen}/>
  </ResultsStack.Navigator>
  )
}

export default class FindScreen extends React.Component {


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
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('black',true);
    return (
      
      // <SafeAreaView>
        <View style={styles.container}>
         <View style={styles.headlineContainer}>
                <Image style={styles.logo}
                    source={require('../assets/logo_trans.png')} 
                />
         <Text style={styles.searchText}>Search for your ride on Carocherry. You can select either one of Departure and Destination or both.</Text>
          </View>
          <GooglePlacesAutocomplete //Default implementation
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
                paddingHorizontal:15
              },
              separator: {
                backgroundColor: 'grey',
                height: 1
              }
            }}
            placeholder='Departure'
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
          renderRow={(data: GooglePlaceData) => <PlaceRender data={data} />} //Renders each result in a component named PlaceRender
        />
          <GooglePlacesAutocomplete //Default implementation
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
                paddingHorizontal:15
              },
              separator: {
                backgroundColor: 'grey',
                height: 1
              }
            }}
            placeholder='Destination'
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
          renderRow={(data: GooglePlaceData) => <PlaceRender data={data} />} //Renders each result in a component named PlaceRender
        />
  
         {/* Checks if input fields are empty and navigates to next screen */}
        <TouchableOpacity style={styles.button} onPress={() => {
                 if (this.state.originStatus !== '' || this.state.destinationStatus !== '') {
                //  console.log(this.props.navigation)          
                 this.props.navigation.navigate("Results", { state: this.state })
                 }
                 else 
                 return
                 
          }}>
              <Text style={styles.buttonText}>Find a Ride!</Text>  
        </TouchableOpacity>
        </View>
      // </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: '100%',
    paddingBottom: 20,
    paddingTop: 50,
    paddingHorizontal: 15
  },
  button: {
    width: '100%',
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 'auto'
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  searchText: {
    textAlign: 'center',
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 28,
    fontWeight: "400",
    color: "#dd5b45",
    fontFamily: 'Lobster_400Regular'
  },
  logo: {
    width: 450,
    height: 100,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff'
  }
});
