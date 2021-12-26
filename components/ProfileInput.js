import React, {useState} from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const ProfileInput = ({title, inputType, onUpdate, value}) => {
    
    return (
        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
            <Text style={styles.textTitles}>{title}</Text>
            <TextInput value={value} keyboardType={inputType} style={styles.input} onChangeText={onUpdate} />
        </View>
    );

};

const styles = StyleSheet.create({
    textTitles: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7D0036'
    },
    input: {
        paddingHorizontal: 10,
    }
})

export default ProfileInput;