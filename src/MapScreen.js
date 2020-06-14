import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from 'expo-location';


export default function Map ({navigation}){
    const [location, setLocation] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let location1 = await Location.getCurrentPositionAsync({});
        setLocation(JSON.stringify(location1));
        console.log(location1);
        // console.log("latitude="+ await location.coords.latitude);
        // console.log("longitude="+ await location.coords.longitude);
        // console.log("\njsonlocation=")
        // console.log( JSON.stringify(location));
      })();
    },[navigation]);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      console.log("LOC: "+location);
    }
  
    
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 53.206292,
            longitude: 50.133632,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
             coordinate={{ latitude: 53.206292, longitude: 50.133632 }}
            //coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude}}
            title={"You"}
            description={"are here"}
          />

          <Marker
            coordinate={{ latitude: 53.306292, longitude: 50.233632 }}
            title={"Friend"}
            description={"is here"}
          />

          <Polyline
            coordinates={[
              { latitude: 53.206292, longitude:  50.133632 }, 
              { latitude: 53.306292, longitude: 50.233632 } 
            ]}
            strokeWidth={4}
          />

          {/* <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          /> */}
        </MapView>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
