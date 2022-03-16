import React, {useState} from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const ProfileInput = ({title, inputType, onUpdate, value}) => {
    
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.textTitles}>{title}</Text>
            <TextInput value={value} keyboardType={inputType} style={styles.input} onChangeText={onUpdate} />
        </View>
    );

};

const styles = StyleSheet.create({
    textTitles: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7D0036'
    },
    input: {
        // borderBottomColor: "#8A8F9E",
        height: 50,
        fontSize: 18,
        color: "black",
        borderRadius: 10,
        // marginTop: 15,
        backgroundColor: 'white',
        paddingLeft: 15,
        textAlignVertical: 'center',
    },
    inputContainer: {

    }
})

export default ProfileInput;