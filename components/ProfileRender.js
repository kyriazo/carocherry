import React, {useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as firebase from "firebase";


const ProfileRender = (props) => {

    const [renderInfo, setRenderInfo] = useState([]);

    return (
       <View>
            <TouchableOpacity 
            onPress={() => {
                var state;
                firebase
                .database()
                .ref(`/users/${props.value.uid}`)
                .once('value')
                .then((snapshot) => {
                state = snapshot.val();
                setRenderInfo(state);
                console.log(state);
            });
              }}>
            <Text style={styles.textTitles}>This is a ride from {props.value.originName} to {props.value.destionationName} from user with name {renderInfo.name}</Text>

            </TouchableOpacity>

        </View>
       
    );

};

const styles = StyleSheet.create({
    textTitles: {
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#7D0036'
    },
    input: {
        paddingHorizontal: 10,
    }
})

export default ProfileRender;