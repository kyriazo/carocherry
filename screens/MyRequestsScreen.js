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
import RequestRender from "../components/RequestRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { color, set } from "react-native-reanimated";

const MyRequestsScreen = (props) => {

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
       //gets snapshot from firebase and sets initial array of objects with unique ruids.
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
  return () => firebase.database().ref(`/rides`).off('value', connection);
},[]);

    return ( 
               
        /* The FlatList below renders only the requests of the current user by checking each request from the rides listed and matching uid and ruid. */
        <FlatList
        ListHeaderComponent={
            <>
            <Text style={styles.pageTitle}>My Requests</Text>
            </>
          }
        data={rides}
        style={styles.container}
        keyExtractor={(item, index) => item.ruid}
        renderItem={({ item }) => {
          const { currentUser } = firebase.auth(); 
          var answers = item.requests;  
          if (item.requests == null)
          return
          //Separate rideId and userId. Scan rides array until ruid matches and then do same for user id. Then render that object.
          const result = Object.values(answers);   
          const rideId = result.map((data) => data.rideId);
          const userId = result.map((data) => data.uid);
          for (var i=0; i < rideId.length; i++)
          if (rideId[i] == item.ruid)
          for (var j=0; j < userId.length; j++)
          if (userId[j] == currentUser.uid)
          return (
            <View>
               <RequestRender value={item} />
               <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Are you sure you want to delete your request?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => 
                            {
                              //Increases seats of ride by 1 only if the user was accepted. Otherwise the request gets deleted without altering seats.
                              const requests = _.map(item.requests, (val, ruid) => {
                                return { ...val, ruid};
                              });
                              for (var i=0; i < requests.length; i++){
                                var id = requests[i].ruid
                                if (requests[i].isAccepted == null)
                                  return;
                                if (requests[i].isAccepted){
                                  firebase.database().ref(`/rides/${item.ruid}`).update({seats: item.seats+1});
                                }
                                if (requests[i].uid == currentUser.uid)
                                firebase.database().ref(`/rides/${item.ruid}/requests/${requests[i].ruid}`).remove();
                              }
                          }
                        }
                        ]
                      );
                    }
                    }
                  >
                   <Text style={styles.deleteText}>Delete Request</Text>
                  </TouchableOpacity>
            </View>
           
          );
        }}
      />
 
    );
  }
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3e1d6'
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
  },
  pageTitle: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 28,
    fontWeight: "400",
    color: "#dd5b45",
    fontFamily: 'Lobster_400Regular'
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
});

export default MyRequestsScreen;