import _ from "lodash";
import React from "react";
import {
FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyRidesRender from "../components/MyRidesRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
 
    state = {
        email: "",
        name: "",
    };

    componentDidMount() {
        const { email, name } = firebase.auth().currentUser;
        const { currentUser } = firebase.auth();
            var state;
            firebase
      .database()
      .ref(`/rides`)
      .once("value")
      .then((snapshot) => {
        state = snapshot.val();
        const rides = _.map(state, (val, ruid) => {
          return { ...val, ruid};
        });
        const reverseRides = rides.reverse()
        const myArray = reverseRides.filter(function ( obj ) {
            return obj.uid == currentUser.uid;
        });
        const slicedArray = myArray.slice(0, 5);
        this.setState({
          rides: slicedArray,
        });
      });
      firebase.database()
            .ref((`/users/${currentUser.uid}`))
            .once('value')
            .then((snapshot) => {
                state = snapshot.val()
                this.setState({
                    name: state.name,
                })
            })
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }

   render() {
        console.ignoredYellowBox = [
            'Setting a timer'
        ]
        return (
            <View style={styles.container}>
            <View>
                <Text>Hi {this.state.name}</Text>
                <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

             <View> 
        <Text style={styles.textTitles}>Latest Rides</Text>
        <FlatList  
          data={this.state.rides}
          extraData={this.state.rides}
          renderItem={({ item }) => {
            const { currentUser } = firebase.auth();
                    return (
                    <View>
                        <MyRidesRender value={item} />
                    </View>
                    );            
          }}
           keyExtractor={(item) => item.ruid}
        />
      </View>


            </View>


        );
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upperView: {
    flexDirection: "row",
    flex: 1,
    fontSize: 5
  },
  button: {
    position: 'absolute',
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    top: 50,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitles: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7D0036",
  },
});