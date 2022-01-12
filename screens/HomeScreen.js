import _ from "lodash";
import React from "react";
import {
FlatList,
ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MyRidesRender from "../components/MyRidesRender";
import RequestRender from "../components/RequestRender";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myRideId: ''
    };
    
  }
  render() {
    return ( 
       
        <ScrollView>
        <View> 

        <TouchableOpacity style={{ marginTop: 32 }} onPress={()=> { firebase.auth().signOut(); }}>
        <Text>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.textTitles}>Latest Rides</Text>
        <FlatList
          data={this.state.rides}
          renderItem={({ item }) => {

            const { currentUser } = firebase.auth();
            if (currentUser.uid == item.uid)
            return (
              <View>
                 <MyRidesRender value={item} />
              </View>
            );
          }}
        />
      </View>
      </ScrollView>
    
 
    );
  }
  

     async componentDidUpdate() {
      this.getPermissionAsync();
      //console.log('hi')
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
   }

   getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };


  async componentDidMount() {
    this.getPermissionAsync();
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
        this.setState({
          rides: rides,
        });
      });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
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
  deleteText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7D0036",
  }
});