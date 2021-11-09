import React, {useState} from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const ProfileInput = ({title, inputType, onUpdate, value}) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.textTitles}>{title}</Text>
            <TextInput value={value} keyboardType={inputType} style={styles.input} onChangeText={onUpdate} />
        </View>
    );

};

const styles = StyleSheet.create({
    textTitles: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E9446A',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        height: 40
        // margin: 0 auto
    },
    container: {
        flex: 1,
        // alignItems: 'center'
    }
})

export default ProfileInput;