import React, {useState} from 'react';
import { ScrollView, Modal, TouchableOpacity, View, Text, StyleSheet, Image, TouchableHighlightBase } from 'react-native';
import * as firebase from "firebase";

const ProfileRender = (props) => {
    
    const [renderInfo, setRenderInfo] = useState([]);
    const [modal, setModal] = useState(false);
    var state;
    firebase
    .database()
    .ref(`/users/${props.value.uid}`)
    .once('value')
    .then((snapshot) => {
    state = snapshot.val();
    setRenderInfo(state);
    //console.log(props);
    });

    return (
       <View style={styles.container}>
           <View style={styles.resultsContainer}>
            <Text style={styles.textTitles}>From {props.value.originName}</Text>
            <Text style={styles.textTitles}>To {props.value.destinationName}</Text>
            </View>
            <View style={styles.resultsContainer}>
            <Text> Date: {props.value.date}</Text>
           
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

                        <Text style={styles.textTitles}>{renderInfo.name}</Text>
                        <Text style={styles.textTitles}>{renderInfo.lastName}</Text>
                        <Text style={styles.textTitles}>{renderInfo.miniBio}</Text>
                        <Text style={styles.textTitles}>Likes:</Text>
       
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
        alignSelf: 'flex-start'
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
    },
})

export default ProfileRender;