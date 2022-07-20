import React, {useState,  useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, SnapshotViewIOS} from 'react-native';
import { FAB, RadioButton } from 'react-native-paper';
import * as firebase from "firebase";
import _ from "lodash";

const ReviewRender = (props) => {
    const [status, setStatus] = useState();
    const [statusMessage, setStatusMessage] = useState('pending');
    const [isAccepted, setIsAccepted] = useState();
    const [buttonStatus, setButtonStatus] = useState(true);
    const [checked, setChecked] = useState('');
      

    useEffect(()=>{  
              let isMounted = true;
              if (isAccepted == null)
                return;            
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
        if (state == null){
        return 0;
        }else
        setIsAccepted(state.isAccepted);
      });
  });

   

    return(
        <View>
        <Text style={{fontWeight: 'bold'}}>Status: {statusMessage}</Text>
                <View style={styles.choicesContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton
                      value="first"
                      status={ checked === 'first' ? 'checked' : 'unchecked' }
                      onPress={() => {
                        setStatus(true);
                       // setStatusMessage('Accepted');
                       setChecked('first');
                       setButtonStatus(false);
                    }}
                  /> 
                <Text style={{padding: 5, fontWeight: 'bold', color: 'green', fontSize: 18, marginRight: 20}}>Accept</Text>
                </View>
      
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton
                      value="second"
                      status={ checked === 'second' ? 'checked' : 'unchecked' }
                      onPress={() => {
                        setStatus(false);
                        //setStatusMessage('Not Accepted');
                        setChecked('second');
                        setButtonStatus(false);
                    }}
                  /> 
                <Text style={{padding: 5,fontWeight: 'bold', color: 'red',fontSize: 18}}>Reject</Text>
                </View>
                </View>
                <TouchableOpacity activeOpacity={buttonStatus ? 1 : 0.2} disabled={buttonStatus} style={styles.saveButton} onPress={()=> {
                  if (isAccepted) {
                    setStatusMessage('Accepted')
                  } else
                    setStatusMessage('Not Accepted');
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
                <Text style={{ color: "#FFF", fontWeight: "500" , fontSize: 18}}>Save</Text>
                </TouchableOpacity>  

        </View>
    );
};

const styles = StyleSheet.create({
    saveButton:{
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        width: '50%',
        alignSelf: 'center',
        marginTop: 10
      },
    choicesContainer:{
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10
    }
})

export default ReviewRender;