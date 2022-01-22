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

const MyRidesScreen = (props) => {

    const [state, setState] = useState({myRideId: ''})
    const [rides, setRides] = useState([]);
    const [initialRides, setInitialRides] = useState([]);
 
    //UseEffect hook used in same way as ComponentDidMount
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

//Listener to update
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
       
      <ScrollView>

        <View>
        <Text style={styles.textTitles}>My Rides</Text>
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
            );
          }}
           
        />

<Text style={styles.textTitles}>My Requests</Text>
<FlatList
        data={rides}
        keyExtractor={(item, index) => item.ruid}
        renderItem={({ item }) => {
          const { currentUser } = firebase.auth(); 
          var answers = item.requests;  
          if (item.requests == null)
          return
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

export default MyRidesScreen;