import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Button(props) {
  const { onPress, title = 'Save' ,icon = 'home'} = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {title != "" && <Text ifstyle={styles.text}>{title}</Text>}
      <MaterialCommunityIcons name={icon} color='#ffffff' size={30} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    // elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ffffff',
  },
});