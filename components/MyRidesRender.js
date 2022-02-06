import React, {useState,  useEffect} from 'react';
import { FlatList, ScrollView, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TouchableHighlightBase, Button } from 'react-native';
import * as firebase from "firebase";
import _ from "lodash";
import { cos } from 'react-native-reanimated';
import ReviewRender from './ReviewRender';
import { FontAwesome } from '@expo/vector-icons';
import { boxShadow } from 'tailwind-rn/unsupported-core-plugins';

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
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>From</Text>
            <Text style={styles.addressData}>{props.value.originName.split(',')}</Text>
            <Text style={styles.addressLabel}>To</Text>
            <Text style={styles.addressData}>
                <Text>{props.value.destinationName.split(',')[0]}</Text>
                <Text>{props.value.destinationName.split(',')[1]}</Text>
                <Text>{props.value.destinationName.split(',')[2]}</Text>
            </Text>
          </View>
          <View style={styles.verticalContainer}>
            <View style={styles.rightContainer}>
              <Text style={styles.rideType}>{isOffer}</Text>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => setModal(true)}>
                <Image source={{ uri: renderInfo.image }} style={styles.miniCircle} />
                </TouchableOpacity>
                <Text style={styles.textTitles}>{renderInfo.name}</Text>
              </View>
            </View>
            <View style={styles.resultsContainer}>
              <Text> Date: {props.value.date}</Text>
              <TouchableOpacity onPress={() => setRequestsModal(true)}>
              <Text style={{fontWeight: 'bold'}}>Review requests</Text>
              </TouchableOpacity>
            </View>
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
        // flex: 1,
        maxWidth: '100%',
        flexDirection: "row",
        borderColor: '#E9446A',
        borderWidth: 1,
        margin: 10,
        backgroundColor: '#ffffff',
        minHeight: 180,
        // position: 'relative',
        // zIndex: 1
        
    },
    addressContainer: {
      height: '100%', 
      flex: 2,
      // paddingLeft: 5,
      // zIndex: -1,
      // maxWidth: 150,
      // width: '100%',
      flexDirection: "column",
      // alignSelf: 'center',
      // justifyContent: 'center',
      backgroundColor:'#ffffff',
      // borderRadius: 8,
      
  },
  verticalContainer: {
    flex: 3
  },
    resultsContainer: {
        // width: '100%',
        flex: 2,
        flexDirection: "column",
        alignSelf: 'flex-start',
        // justifyContent: 'space-between',
        height: '100%',
        // backgroundColor:'#ffffff',
        backgroundColor:'#910099',
    },
    
    rightContainer: {
       flex:2,
       backgroundColor:'#ffffff',
    },
    // imageContainer: {
    //     // position: 'absolute',
    //     // right: 10,        
    // },
    addressData: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#dd5b45',
        textAlign: 'center',
        flexDirection: 'column',
        flex:20
    },
    addressLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#dd5b45',
        height: 30,
        alignContent: 'center',
        textAlign: 'center',
        paddingTop: 6,
        flex:1,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 10
        
    },
    rideType: {
      backgroundColor: '#eeffee',
      fontWeight: 'bold',
      width: 'auto',
      alignSelf: 'flex-end',
      paddingVertical: 8,
      paddingHorizontal: 9,
      textAlign: 'center',
      borderBottomLeftRadius: 10,
      fontSize: 18,
      // shadowRadius: 50,
      // shadowOffset:  {width: 10,height: 10},
      // borderBottomWidth: 2,
      // borderLeftWidth: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,

      elevation: 5,
          },
    // input: {
    //     paddingHorizontal: 10,
    // },
    // miniCircle: {
    //     height: 60,
    //     width: 60,
    //     borderRadius: 60,
    //     alignSelf: 'center',
    // },
    // circle: {
    //     height: 120,
    //     width: 120,
    //     borderRadius: 120,
    //     alignSelf: 'center',
    // },
    // button: {
    //     marginHorizontal: 30,
    //     backgroundColor: "#E9446A",
    //     borderRadius: 4,
    //     height: 52,
    //     alignItems: "center",
    //     justifyContent: "center",
    //   },
    //   upperView: {
    //     flexDirection: 'row',
    //     backgroundColor: "#E9446A",
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // lowerView: {
    //     flex: 3,
    //     backgroundColor: '#f3e1d6'
    // },
    // requestContainer: {
    //     flexDirection: 'row',
    // },
    // requestBox: {
    //     borderColor: '#E9446A',
    //     borderRadius: 1,
    //     borderWidth: 1,
    //     margin: 10
    // }
})

export default MyRidesRender;