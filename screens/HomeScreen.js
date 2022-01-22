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
import { StatusBar } from "react-native";

const HomeScreen = () => {

  StatusBar.setBarStyle('light-content', true);
  StatusBar.setBackgroundColor('black',true);

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
  var answers = rides;  
  const result = Object.values(answers);   
  const rideDate = result.map((data) => data.date);
  const rideId = result.map((data) => data.ruid);
  for (var i=0; i < rideDate.length; i++){
    var d1 = new Date();
    d1 = Date.parse(d1)
    var d2 = Date.parse(rideDate[i])
    if (d1 > d2){
      console.log('this should be archived', rideId[i]);
      firebase.database()
      .ref(`/rides/${rideId[i]}`)
      .on('value', snapshot => {
      firebase.database().ref(`/archivedRides/${rideId[i]}`).set(snapshot.val());
      });
      //firebase.database().ref(`/rides/${rideId[i]}`).remove();
    }
  }
  const { currentUser } = firebase.auth(); 
  var state;
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

    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('black',true);


    return (    
      <FlatList
        ListHeaderComponent={
          <>
          <Text style={styles.textTitles}>Latest Rides</Text>
          </>
        }
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
        listFooterComponent={
          <>
          </>
        }
      />

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
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 28,
    fontWeight: "400",
    color: "#7D0036",
    fontFamily: 'Lobster_400Regular'
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