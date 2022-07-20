import React, {useState} from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const ProfileInputMultiline = ({title, inputType, onUpdate, value}) => {
    
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.textTitles}>{title}</Text>
            <TextInput value={value} multiline numberOfLines={5} keyboardType={inputType} style={styles.input} onChangeText={onUpdate} />
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
        fontSize: 18,
        color: "black",
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 15,
        textAlignVertical: 'top',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 15
    },
    inputContainer: {

    }
})

export default ProfileInputMultiline;