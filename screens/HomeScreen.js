import _ from "lodash";
import React from "react";
import {useEffect, useState} from 'react';
import {
FlatList,
ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MyRidesRender from "../components/MyRidesRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { color, set } from "react-native-reanimated";

const HomeScreen = () => {

    const [state, setState] = useState({myRideId: ''})
    const [rides, setRides] = useState([]);
    const [initialRides, setInitialRides] = useState([]);
    const [test, setTest] = useState([]);
 
    //UseEffect hook used in same way as ComponentDidMount
  useEffect(() => {
     
      const { currentUser } = firebase.auth();
      var state;
      firebase
     .database()
     .ref(`/rides`)
     .once("value")
     .then((snapshot) => {
       state = snapshot.val();
       const rides = _.map(state, (val, ruid) => {
         return { ...val, ruid};
       });
       const reverseRides = rides.reverse()
       const myArray = reverseRides.filter(function ( obj ) {
           return obj.uid == currentUser.uid;
       });
       const slicedArray = myArray.slice(0, 5);
       setInitialRides(slicedArray)
     });
  }, []);

//Listener to update
useEffect(() => {

  const { currentUser } = firebase.auth(); 
  var state
  const connection = firebase.database()
  .ref(`/rides/`)
  .on('value', snapshot => {
    state = snapshot.val();
    const rides = _.map(state, (val, ruid) => {
      return { ...val, ruid};
    });
    const reverseRides = rides.reverse()
    const myArray = reverseRides.filter(function ( obj ) {
      return obj.uid == currentUser.uid;
  });
    const slicedArray = myArray.slice(0, 5);
    if (rides != initialRides){
      setRides(slicedArray)
    }else
    console.log('Safe')
  });
 // return () => firebase.database().ref(`/rides`).off('value', connection);
}, []);

    return ( 
       
      <ScrollView>
      <View> 

      <TouchableOpacity style={{ marginTop: 32 }} onPress={()=> { firebase.auth().signOut(); }}>
      <Text>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.textTitles}>Latest Rides</Text>
      <FlatList
        data={rides}
        keyExtractor={(item, index) => item.ruid}
        key={(item, index) => item.ruid}
        renderItem={({ item }) => {
          const { currentUser } = firebase.auth();
          if (currentUser.uid == item.uid)
          return (
            <View>
               <MyRidesRender value={item} />
            </View>
          );
        }}
      />
    </View>
    </ScrollView>
 
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upperView: {
    flexDirection: "row",
    flex: 1,
    fontSize: 5
  },
  button: {
    position: 'absolute',
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    top: 50,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitles: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7D0036",
  },
  deleteText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7D0036",
  }
});

export default HomeScreen;