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
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { color, set } from "react-native-reanimated";

const MyRidesScreen = (props) => {

    const [state, setState] = useState({myRideId: ''})
    const [rides, setRides] = useState([]);
    const [initialRides, setInitialRides] = useState([]);
 
  //useEffect hook used to set the initial rides fetched from firebase.
  useEffect(() => {
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
       setInitialRides(rides)
     });
  }, []);

//Listens to firebase and updates the state only if its different from initial state so it gets rendered on screen.
useEffect(() => {
  var state;
  const connection = firebase.database()
  .ref(`/rides/`)
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

  var answers = rides;  
  const result = Object.values(answers);   
  const rideDate = result.map((data) => data.date);
  const rideId = result.map((data) => data.ruid);
  for (var i=0; i < rideDate.length; i++){
    var d1 = new Date();
    d1 = Date.parse(d1)
    var d2 = Date.parse(rideDate[i])
    if (d1 > d2){
      // console.log('this should be archived', rideId[i]);
      firebase.database()
      .ref(`/rides/${rideId[i]}`)
      .on('value', snapshot => {
      firebase.database().ref(`/archivedRides/${rideId[i]}`).set(snapshot.val());
      });
      //firebase.database().ref(`/rides/${rideId[i]}`).remove();
    }
  }

  return () => firebase.database().ref(`/rides`).off('value', connection);
},[]);

    return ( 
       

        <FlatList
          ListHeaderComponent={
            <>
            <Text style={styles.pageTitle}>My Rides</Text>
            </>
          }
          style= {styles.container}
          data={rides}
          keyExtractor={(item, index) => item.ruid}
          key={(item, index) => item.ruid}
          renderItem={({ item }) => {
            const { currentUser } = firebase.auth();
            if (currentUser.uid == item.uid)
            return (
              <View >
                  {/* Renders each ride on a separate component */}
                 <MyRidesRender style={styles.renderItem} value={item} />
                  {/* Archives ride after alert confirmation */}
                  <View style={{zIndex: 100}}>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Are you sure you want to archive this ride?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => 
                            {
                              firebase.database().ref(`/archivedRides/${item.ruid}`).set(item);
                              firebase.database().ref(`/rides/${item.ruid}`).remove();
                          }
                        }
                        ]
                      );
                    }
                    }
                  >
                   <Text style={styles.deleteText}>Archive this Ride</Text>
                  </TouchableOpacity>
                  </View>
              </View>
            );
          }}
           
        />
 
    );
  }
  
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#f3e1d6',
    paddingHorizontal: 15
  },
  upperView: {
    flexDirection: "row",
    flex: 1,
    fontSize: 15
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
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: -10,
    left:10,
    borderLeftColor: '#E9446A',
    borderLeftWidth: 1,
    borderBottomColor: '#E9446A',
    borderBottomWidth: 1,
    borderRightColor: '#E9446A',
    borderRightWidth: 1
  },
  pageTitle: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 28,
    fontWeight: "400",
    color: "#dd5b45",
    fontFamily: 'Lobster_400Regular'
  }
});

export default MyRidesScreen;