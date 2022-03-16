import React, {useState, useEffect} from 'react';
import { ScrollView, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TouchableHighlightBase, Button } from 'react-native';
import * as firebase from "firebase";
import _ from "lodash";

const ProfileRender = (props) => {
    const [renderInfo, setRenderInfo] = useState([]);
    const [modal, setModal] = useState(false);
    const [smoke, setSmoke] = useState('');
    const [pets, setPets] = useState('');
    const [music, setMusic] = useState('');
    const [luggage, setLuggage] = useState('');
    const [name, setName] = useState('');
    const [requests, setRequests] = useState([]);
    const [isOffer, setIsOffer] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const [date, setDate] = useState(new Date())
    const [requestText, setRequestText] = useState('Request');
    

  useEffect(() => {
    setDate(props.value.date)
    setRequestText('Request');
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

    const { currentUser } = firebase.auth();
    firebase.database()
            .ref((`/users/${currentUser.uid}`))
            .once('value')
            .then((snapshot) => {
                state = snapshot.val()
                setName(state.name);
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
             const userID = requests.map((data) => data.uid)
             for (var i=0; i < userID.length; i++)
              if (userID[i] == currentUser.uid){
                  setRequestText('Request Sent');
              }  
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
      
    return () => { isMounted = false };
  }, []);

  useEffect(() => { 
  var state;
  firebase
  .database()
  .ref(`/rides/${props.value.ruid}/requests`)
  .on('value', snapshot => {
    state = snapshot.val();
    const requests = _.map(state, (val, ruid) => {
    return { ...val, ruid};
    });
    setRequests(requests);
  });
  }, []);

     const sendRequest = () => {
      const { currentUser } = firebase.auth();
      const userID = requests.map((data) => data.uid)
        //setButtonStatus(true)
        for (var i=0; i < userID.length; i++)
        if (userID[i] == currentUser.uid){
            console.log('Request already sent');
            return
        }    
       firebase.database().ref(`/rides/${props.value.ruid}/requests`).push({
         rideId: props.value.ruid,
         uid: currentUser.uid,
         isAccepted: false,
         name: name
       });
       setRequestText('Request Sent');
    }

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
              <View style={styles.imagetextContainer}>
              <View style={styles.rideDetails}>
              <TouchableOpacity disabled={buttonStatus} onPress={sendRequest}>
            <Text style={styles.rideRequestText}>{requestText}</Text>
            </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image source={{ uri: renderInfo.image }} style={styles.miniCircle} />
                <Text style={styles.textTitles}>{renderInfo.name}</Text>
                </View>
              </View>
            <View style={styles.dateContainer}>
              {/* <Text style={styles.dateLabel}> Date</Text> */}
              <Text style={styles.dateValue}>{props.value.date}</Text>
              <Text style={styles.rideType}>{isOffer}</Text>
            </View>
          </View>

            {/* <View style={styles.resultsContainer}>
            <Text> Date: {date.toLocaleString()}</Text>
            <Text>{isOffer}</Text>
            <TouchableOpacity disabled={buttonStatus} onPress={sendRequest}>
            <Text style={{fontWeight: 'bold'}}>Request</Text>
            </TouchableOpacity>
            <Text>Seats available: {props.value.seats}</Text>
            </View> */}

            {/* <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setModal(true)}>
            <Image source={{ uri: renderInfo.image }} style={styles.miniCircle} />
            </TouchableOpacity>
            <Text style={styles.textTitles}>{renderInfo.name}</Text>
            </View> */}

            <Modal visible={modal} animationType="slide"
            onRequestClose={() => { setModal(false) }}
            >
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
    // container: {
    //     flex: 1,
    //     flexDirection: "row",
    //     borderColor: '#E9446A',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     margin: 10
    // },
    // resultsContainer: {
    //     width: 100,
    //     flexDirection: "column",
    //     alignSelf: 'flex-start'
    // },
    // imageContainer: {
    //     position: 'absolute',
    //     marginTop: 10,
    //     right: 10
    // },
    // textTitles: {
    //     padding: 10,
    //     fontSize: 14,
    //     fontWeight: 'bold',
    //     color: '#7D0036'
    // },
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
    //     borderRadius: 10,
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
    // },
    container: {
        // flex: 1,
        maxWidth: '100%',
        flexDirection: "row",
        borderColor: '#E9446A',
        borderWidth: 1,
        marginVertical: 30,
        marginHorizontal: 10,
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
    dateContainer: {
        width: '100%',
        flex: 3,
        flexDirection: "column",
        justifyContent: 'center',
        position: 'relative',
        // height: '100%',
        backgroundColor:'#ffffff',
        fontSize: 18,
        // paddingBottom: 10
    },
    dateLabel: {
      fontSize: 20,
      textAlign: 'center'
    },
    dateValue: {
      fontSize: 18,
      textAlign:'center',
      textAlignVertical: 'top',
      height: '100%',
      fontWeight: 'bold'
    },
    imageContainer: {
       flex:1,
       backgroundColor:'#ffffff',
       textAlign: 'center',
       paddingTop: 8,
    },
    imagetextContainer: {
      flex: 1,
      flexDirection: 'row',
      textAlignVertical: 'center',
      height: '100%',
    },
    rideDetails: {
      textAlignVertical: 'center',
      flex: 1
    },
    rideRequestText: {
      textAlignVertical: 'center',
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: 18,
      height: '100%'
    },
    addressData: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#dd5b45',
        textAlign: 'center',
        flexDirection: 'column',
        flex:20,
        paddingTop: 15,
        paddingHorizontal: 5,
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
      backgroundColor: '#f3e1d6',
      fontWeight: 'bold',
      width: 'auto',
      alignSelf: 'flex-end',
      paddingVertical: 4,
      paddingHorizontal: 9,
      textAlign: 'center',
      borderTopLeftRadius: 10,
      // borderTopRightRadius: 10,
      fontSize: 18,
      position: 'absolute',
      bottom: 0,
      // shadowRadius: 50,
      // shadowOffset:  {width: 10,height: 10},
      // borderBottomWidth: 2,
      // borderLeftWidth: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -6,
      },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,

      elevation: 5,
          },
    // input: {
    //     paddingHorizontal: 10,
    // },
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
      modalViewsContainer: {
        flex:1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      },
      modalView: {
        backgroundColor: '#f3e1d6',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'flex-start'

      },
    upperView: {
      flexDirection: 'row',
      backgroundColor: "#E9446A",
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
      width: '100%',
    },
    modalTextName: {
      fontSize: 26,
      color: '#000000',
      fontWeight: 'bold'
    },
    lowerView: {
        flex: 6,
        height: '100%',
        paddingVertical: 25,
        alignItems: 'center',
        width: '100%'
        // backgroundColor: '#00ffff',

    },
    lowerViewTexts: {
      maxWidth: '80%',
      width: '100%'
      // textAlign: 'center'
    },
    
    modalMainTitle: {
      fontSize: 34,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 30
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    modalText: {
      fontSize: 16,
      paddingVertical: 5
    },
    modalButton: {
      marginHorizontal: 30,
      backgroundColor: "#E9446A",
      borderRadius: 10,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      width: '80%'
    },
    requestContainer: {
        flexDirection: 'row',
    },
    requestBox: {
        borderColor: '#E9446A',
        borderRadius: 1,
        borderWidth: 1,
        margin: 10
    },
    textTitles: {
      textAlign: 'center',
      width: 'auto'
    }
})

export default ProfileRender;