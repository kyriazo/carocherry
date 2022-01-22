import _ from "lodash";
import React from "react";
import {useEffect, useState} from 'react';
import {
  Alert,
FlatList,
ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MyRidesRender from "../components/MyRidesRender";
import RequestRender from "../components/RequestRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { color, set } from "react-native-reanimated";

const ArchiveScreen = (props) => {

    const [state, setState] = useState({myRideId: ''})
    const [rides, setRides] = useState([]);
    const [initialRides, setInitialRides] = useState([]);
 
    //UseEffect hook used in same way as ComponentDidMount
  useEffect(() => {
      var state;
      firebase
     .database()
     .ref(`/archivedRides`)
     .once("value")
     .then((snapshot) => {
       state = snapshot.val();
       const rides = _.map(state, (val, ruid) => {
         return { ...val, ruid};
       });
       setInitialRides(rides)
     });
  }, []);

//Listener to update
useEffect(() => {
  var state;
  const connection = firebase.database()
  .ref(`/archivedRides`)
  .on('value', snapshot => {
    state = snapshot.val();
    const rides = _.map(state, (val, ruid) => {
      return { ...val, ruid};
    });
    if (rides != initialRides)
      setRides(rides)
    else
    console.log('Safe')
  });
  return () => firebase.database().ref(`/archivedRides`).off('value', connection);
},[]);

    return ( 
       
      <ScrollView>

        <View> 
        <Text style={styles.textTitles}>Archived Rides</Text>
        <FlatList
          data={rides}
          keyExtractor={(item, index) => item.ruid}
          key={(item, index) => item.ruid}
          renderItem={({ item }) => {
            const { currentUser } = firebase.auth();
            if (currentUser.uid == item.uid)
            return (
              <View>
                  {/* Renders each ride on a separate component */}
                 <MyRidesRender value={item} />
                  {/* Deletes ride after alert confirmation */}

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

export default ArchiveScreen;