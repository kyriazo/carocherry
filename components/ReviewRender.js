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
              if (isAccepted){  
              setStatusMessage('Accepted');
              }else 
              setStatusMessage('Not Accepted');
    },[isAccepted]);

    useEffect(()=>{
      var state;
      firebase
      .database()
      .ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`)
      .on('value', snapshot => {
        state = snapshot.val();
        setIsAccepted(state.isAccepted);
      })
  });

   

    return(
        <View>
        <Text>Status: {statusMessage}</Text>
        <TouchableOpacity
                    onPress={() => {
                        setStatus(true);
                        setStatusMessage('Accepted');
                        setButtonStatus(false);
                    }}
                  >
                <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { 
                        setStatus(false);
                        setStatusMessage('Not Accepted');
                        setButtonStatus(false);
                    }}
                  >
                <Text>Reject</Text>
                </TouchableOpacity>
              
                <TouchableOpacity activeOpacity={buttonStatus ? 1 : 0.2} disabled={buttonStatus} style={styles.saveButton} onPress={()=> {
                    if (status){
                    var state;
                      if (isAccepted){
                       alert('Already accepted')
                        return 0;
                      }

                    firebase.database().ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`).update({isAccepted: true});
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
                      });
                    }else{
                    if (!isAccepted){
                      alert('Already rejected')
                      return 0;
                    }

                    firebase.database().ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`).update({isAccepted: false}); 
                    firebase
                    .database()
                    .ref(`/rides/${props.value.rideId}`)
                    .once("value")
                    .then((snapshot) => {
                      state = snapshot.val();
                      if (state.seats >= state.seatLimit){
                      return 0;
                      }else
                      firebase.database().ref(`/rides/${props.value.rideId}`).update({seats: state.seats+1})
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
})

export default ReviewRender;