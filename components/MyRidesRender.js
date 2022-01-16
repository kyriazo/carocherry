import React, {useState,  useEffect} from 'react';
import { FlatList, ScrollView, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TouchableHighlightBase, Button } from 'react-native';
import * as firebase from "firebase";
import _ from "lodash";
import { cos } from 'react-native-reanimated';
import ReviewRender from './ReviewRender';
import { FontAwesome } from '@expo/vector-icons'; 

const MyRidesRender = (props) => {
    
    //Initialization of needed variables
    const [renderInfo, setRenderInfo] = useState([]);
    const [modal, setModal] = useState(false);
    const [requestsModal, setRequestsModal] = useState(false);
    const [seats, setSeats] = useState(props.value.seats);
    const [smoke, setSmoke] = useState('');
    const [pets, setPets] = useState('');
    const [music, setMusic] = useState('');
    const [luggage, setLuggage] = useState('');
    const [requests, setRequests] = useState([]);
    const [isOffer, setIsOffer] = useState('');
    
//UseEffect hook used in same way as ComponentDidMount
  useEffect(() => {
    let isMounted = true; // note mutable flag
    var state;
    firebase
    .database()
    //Fetch user from firebase
    .ref(`/users/${props.value.uid}`) 
    .once('value')
    .then((snapshot) => {
    state = snapshot.val();
    setRenderInfo(state)
    });
    firebase
    .database()
    //Fetch requests from firebase
    .ref(`/rides/${props.value.ruid}/requests`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const requests = _.map(state, (val, ruid) => {
          return { ...val, ruid};
        });
        setRequests(requests);
      });

    //Set preferences texts 
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
        setIsOffer('Asking')
        return () => { isMounted = false }; // cleanup
  }, []);

//Listener to update seats remaining
  useEffect(() => { 
    var state
    firebase.database()
    .ref(`/rides/${props.value.ruid}`)
    .on('value', snapshot => {
      state = snapshot.val();
      if (state == null){
        return 0;
      }else{
        setSeats(state.seats)
    }
    });

  // Stop listening for updates when no longer required
  //return () => database().ref(`/rides/${props.value.ruid}`).off('value', onChildAdd);
  });


    return (
       <View style={styles.container}>
           <View style={styles.resultsContainer}>
            <Text style={styles.textTitles}>From {props.value.originName}</Text>
            <Text style={styles.textTitles}>To {props.value.destinationName}</Text>
            </View>
            <View style={styles.resultsContainer}>
            <Text> Date: {props.value.date}</Text>
            <Text>{isOffer}</Text>
            <TouchableOpacity onPress={() => setRequestsModal(true)}>
            <Text style={{fontWeight: 'bold'}}>Review requests</Text>
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
        <Modal visible={requestsModal} animationType="slide">
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
            <Text style={{fontWeight: 'bold'}}>List of incoming requests:</Text>
            {/* Button to fetch new requests with call to firebase */}
            <TouchableOpacity onPress={() => {
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
             <FontAwesome style={{marginRight: 10}} name="refresh" size={30} color="black" /> 
             </TouchableOpacity> 
            
            </View>
            <Text>Seats left: {seats}</Text>
            
            <FlatList
                data={requests}
                keyExtractor={(item, index) => item.ruid}
                key={(item, index) => item.ruid}
                renderItem={({ item }) => {
                if (item.rideId == props.value.ruid)
                return (      
                <View style={styles.requestBox}>
                <Text>Request from {item.name} with uid {item.uid}</Text>
                {/* Renders review for each request on a separate component */}
                <ReviewRender value={item}/>
                </View>
                );
          }}
        />
            
             <TouchableOpacity style={styles.button} onPress={() => setRequestsModal(false)}>
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Back</Text>
            </TouchableOpacity>
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
    },
    requestBox: {
        borderColor: '#E9446A',
        borderRadius: 1,
        borderWidth: 1,
        margin: 10
    }
})

export default MyRidesRender;