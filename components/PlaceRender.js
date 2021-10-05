import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Foundation } from '@expo/vector-icons'; 
import * as firebase from "firebase";

const PlaceRender = ({ data }) => {
    console.log(data.description);
    return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                <Foundation name="marker" size={20} color="white" />
            </View>
                <Text>{data.description}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      iconContainer: {
        backgroundColor: '#a2a2a2',
        padding: 10,
        borderRadius: 50,
        marginRight: 15,
      },

  });

export default PlaceRender

