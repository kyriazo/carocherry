import React, {useState,  useEffect} from 'react';
import { FlatList, ScrollView, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TouchableHighlightBase, Button } from 'react-native';
import * as firebase from "firebase";
import _ from "lodash";

const ReviewRender = (props) => {
    const [isAccepted, setIsAccepted] = useState()
    const [status, setStatus] = useState();
    const [statusMessage, setStatusMessage] = useState('pending');
    const [requests, setRequests] = useState([]);

    useEffect(()=>{
        var state;
        firebase
        .database()
        .ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`)
          .once("value")
          .then((snapshot) => {
            state = snapshot.val();
            console.log(state.isAccepted);
            setIsAccepted(state.isAccepted);
            if (state.isAccepted){
              setStatusMessage('Accepted')
              }else
              setStatusMessage('Not Accepted')
          });       
    },[]);

    return(
        <View>
        <Text>Status: {statusMessage}</Text>
        <TouchableOpacity
                    onPress={() => {
                        setStatus(true)
                        setStatusMessage('Accepted')
                      
                    }}
                  >
                <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { 
                        setStatus(false)
                        setStatusMessage('Not Accepted')
                   
                    }}
                  >
                <Text>Reject</Text>
                </TouchableOpacity>
              
                <TouchableOpacity style={styles.saveButton} onPress={()=> {
                    if (status)
                    firebase.database().ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`).update({isAccepted: true});
                    else
                    firebase.database().ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`).update({isAccepted: false}); 
                    var state;
                    firebase
                    .database()
                    .ref(`/rides/${props.value.rideId}/requests/${props.value.ruid}`)
                      .once("value")
                      .then((snapshot) => {
                        state = snapshot.val();
                        setRequests(state.isAccepted);
                        console.log(state);
                      });
                   
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