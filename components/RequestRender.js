import React, {useState,  useEffect} from 'react';
import { FlatList, ScrollView, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TouchableHighlightBase, Button } from 'react-native';
import * as firebase from "firebase";
import _ from "lodash";
import { FontAwesome } from '@expo/vector-icons'; 


const RequestRender = (props) => {
    
    const [renderInfo, setRenderInfo] = useState([]);
    const [modal, setModal] = useState(false);
    const [requestsModal, setRequestsModal] = useState(false);
    const [array, setArray] = useState([]);
    const [smoke, setSmoke] = useState('');
    const [pets, setPets] = useState('');
    const [music, setMusic] = useState('');
    const [luggage, setLuggage] = useState('');
    const [requests, setRequests] = useState([]);
    const [isOffer, setIsOffer] = useState('');
    const [statusMessage, setStatusMessage] = useState('pending');
 
  
  useEffect(() => {
    let isMounted = true;               // note mutable flag
    var state;
    firebase
    .database()
    .ref(`/users/${props.value.uid}`)
    .once('value')
    .then((snapshot) => {
    state = snapshot.val();
    setRenderInfo(state)
    });
    firebase
    .database()
    .ref(`/rides/${props.value.ruid}/requests`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const requests = _.map(state, (val, ruid) => {
          return { ...val, ruid};
        });
        setRequests(requests);
      });
    if (props.value.smokeAllow)
        setSmoke('Smoking is allowed.')
    else    
        setSmoke('Smoking is not allowed.')
    if (props.value.petsAllow)
        setPets('Pets are fine.')
    else    
        setPets('No pets please.')
    if (props.value.musicAllow)
        setMusic('I like music.')
    else    
        setMusic('I prefer silence.')
    if (props.value.luggageAllow)
        setLuggage('There is enough room for luggage.')
    else    
        setLuggage('There is no room for luggage.')
    if (props.value.isOffer)
        setIsOffer('Offering')
    else    
        setIsOffer('Requesting')
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, []);


    useEffect(()=>{
        console.log('spam')
        const { currentUser } = firebase.auth(); 
        var answers = requests;  
        if (requests == null)
        return
        const result = Object.values(answers);   
        const rideId = result.map((data) => data.rideId);
        const userId = result.map((data) => data.uid);
        const isAccepted = result.map((data) => data.isAccepted);
        for (var i=0; i < userId.length; i++)
        if (userId[i] == currentUser.uid){
            if (isAccepted[i]){
                setStatusMessage("Accepted.")
        }else
                setStatusMessage("Not Accepted.")     
        }
    });

    return (
       <View style={styles.container}>
           <View style={styles.resultsContainer}>
            <Text style={styles.textTitles}>From {props.value.originName}</Text>
            <Text style={styles.textTitles}>To {props.value.destinationName}</Text>
            </View>
            <View style={styles.resultsContainer}>
            <Text> Date: {props.value.date}</Text>
            <Text>Status is: {statusMessage}</Text>
            <Text>{isOffer}</Text>
            <TouchableOpacity onPress={()=>{
            var state;
            firebase
            .database()
            .ref(`/rides/${props.value.ruid}/requests`)
            .once("value")
            .then((snapshot) => {
            state = snapshot.val();
            const requests = _.map(state, (val, ruid) => {
              return { ...val, ruid};
            });
            setRequests(requests);
          });
            }}>
            <FontAwesome name="refresh" size={24} color="black" /> 
            </TouchableOpacity>    
            </View>
            <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setModal(true)}>
            <Image source={{ uri: renderInfo.image }} style={styles.miniCircle} />
            </TouchableOpacity>
            <Text style={styles.textTitles}>{renderInfo.name}</Text>
            </View>
            <Modal visible={modal} animationType="slide">
            <View>
            <ScrollView>
                <View style={{ flex: 1 }}>

                    <View style={styles.upperView}>

                       
                            <View style={{
                                height: 120,
                                width: 120,
                                borderRadius: 120,
                                backgroundColor: 'white'
                            }}>
                                <Image source={{ uri: renderInfo.image }} style={styles.circle} />
                            </View>
                      
                    </View>


                    <View style={styles.lowerView}>

                        <Text style={styles.textTitles}>{renderInfo.name} {renderInfo.lastName}</Text>
                        <Text style={styles.textTitles}>{renderInfo.miniBio}</Text>
                        <Text style={styles.textTitles}>{renderInfo.make} {renderInfo.model} {renderInfo.color}</Text>
                        <Text style={styles.textTitles}>Ride Preferences:</Text>
                        <Text style={styles.textTitles}>{smoke}</Text>
                        <Text style={styles.textTitles}>{pets}</Text>
                        <Text style={styles.textTitles}>{music}</Text>
                        <Text style={styles.textTitles}>{luggage}</Text>
                    </View>

                </View>
            </ScrollView> 
            <TouchableOpacity style={styles.button} onPress={() => setModal(false)}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Back</Text>
            </TouchableOpacity>
          </View>

        </Modal>

        </View> 
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderColor: '#E9446A',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10
    },
    resultsContainer: {
        width: 100,
        flexDirection: "column",
        alignSelf: 'flex-start',
    },
    imageContainer: {
        position: 'absolute',
        marginTop: 10,
        right: 10
    },
    textTitles: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7D0036'
    },
    input: {
        paddingHorizontal: 10,
    },
    miniCircle: {
        height: 60,
        width: 60,
        borderRadius: 60,
        alignSelf: 'center',
    },
    circle: {
        height: 120,
        width: 120,
        borderRadius: 120,
        alignSelf: 'center',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
      },
      upperView: {
        flexDirection: 'row',
        backgroundColor: "#E9446A",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lowerView: {
        flex: 3,
        backgroundColor: '#f3e1d6'
    },
    requestContainer: {
        flexDirection: 'row',
    }
})

export default RequestRender;