import React, {useState,  useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, SnapshotViewIOS} from 'react-native';
import * as firebase from "firebase";
import _ from "lodash";

const ReviewRender = (props) => {
    const [status, setStatus] = useState();
    const [statusMessage, setStatusMessage] = useState('pending');
    const [isAccepted, setIsAccepted] = useState();
    const [buttonStatus, setButtonStatus] = useState(true);

    useEffect(()=>{  
              let isMounted = true;               // note mutable flag
              if (isAccepted){  
              setStatusMessage('Accepted');
              }else{
              setStatusMessage('Not Accepted');
              }
              return () => { isMounted = false }; // cleanup toggles value, if unmounted
    },[isAccepted]);

    useEffect(()=>{
      var state;
      firebase
      .database()
      .ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`)
      .on('value', snapshot => {
        state = snapshot.val();
        setIsAccepted(state.isAccepted);
        console.log("more spam")
      });
  });

   

    return(
        <View>
        <Text style={{fontWeight: 'bold'}}>Status: {statusMessage}</Text>
                <View style={styles.choicesContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setStatus(true);
                        setStatusMessage('Accepted');
                        setButtonStatus(false);
                    }}
                  >
                <Text style={{padding: 5, fontWeight: 'bold', color: 'green'}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { 
                        setStatus(false);
                        setStatusMessage('Not Accepted');
                        setButtonStatus(false);
                    }}
                  >
                <Text style={{padding: 5, fontWeight: 'bold', color: 'red'}}>Reject</Text>
                </TouchableOpacity>
                </View>
              
                <TouchableOpacity activeOpacity={buttonStatus ? 1 : 0.2} disabled={buttonStatus} style={styles.saveButton} onPress={()=> {
                    if (status){
                    var state;
                      if (isAccepted){
                       alert('Already accepted')
                        return 0;
                      }
                    firebase
                    .database()
                    .ref(`/rides/${props.value.rideId}`)
                    .once("value")
                    .then((snapshot) => {
                      state = snapshot.val(); 
                      if (state.seats == 0){
                        alert('No seats left!')
                        firebase.database().ref(`/rides/${props.value.rideId}`).update({seats: 0})
                        return 0;
                        }else
                      firebase.database().ref(`/rides/${props.value.rideId}`).update({seats: state.seats-1})
                      firebase.database().ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`).update({isAccepted: true});
                      });

                    }else{
                    if (!isAccepted){
                      alert('Already rejected')
                      return 0;
                    }
                    firebase
                    .database()
                    .ref(`/rides/${props.value.rideId}`)
                    .once("value")
                    .then((snapshot) => {
                      state = snapshot.val();
                      if (state.seats >= state.seatLimit){
                        return 0;
                      }
                      else
                      firebase.database().ref(`/rides/${props.value.rideId}`).update({seats: state.seats+1})
                      firebase.database().ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`).update({isAccepted: false}); 
                      });
                    }
                }}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>Save</Text>
                </TouchableOpacity>  

        </View>
    );
};

const styles = StyleSheet.create({
    saveButton:{
        marginHorizontal: 90,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 32,
        alignItems: "center",
        justifyContent: "center"
      },
    choicesContainer:{
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "center"
    }
})

export default ReviewRender;