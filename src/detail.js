import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState
} from "@react-navigation/native";

import { styles } from "./styles/styles";
import { gray } from "color-name";
import * as SecureStore from "expo-secure-store";

Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const index = useNavigationState(state => state.index);

  console.log(`Screen index: ${index}`);

  useFocusEffect(
    React.useCallback(() => {
      fetch("https://restcountries.eu/rest/v2/capital/tallinn").then(
        response => {
          response.json().then(data => {
            // console.log(data);
          });
        }
      );
      return () => console.log("lost focus");
    })
  );

  return (
    <View style={styles.bottom}>
      <Text style={styles.title}></Text>
      {/* {
        Platform.select({
          ios:
            <Button
              title='View Bottom Tabs'
              onPress={() => navigation.navigate('Bottom Tabs', { name: "param 1" })}
            />,
          android:
            <TouchableOpacity
              style={{ marginBottom: 16 }}
              onPress={() => navigation.navigate('Bottom Tabs', { name: "param 1" })}>
              <Text style={{ color: 'blue', fontSize: 20 }}>View Bottom Tabs</Text>
            </TouchableOpacity>
        })
      } */}
      {Platform.select({
        ios: (
          <Button
            title="Exit"
            onPress={() => navigation.navigate("Top Tabs", { name: "param 2" })}
          />
        ),
        android: (
          <TouchableOpacity
            style={{ marginBottom: 16, borderColor: gray }}
            onPress={() => {
              SecureStore.setItemAsync("token", "", {});
              SecureStore.setItemAsync("login", "", {})
              navigation.navigate("Top Tabs", { name: "param 2" });
            }}
          >
            <Text style={{ color: "red", fontSize: 20 }}>Exit</Text>
          </TouchableOpacity>
        )
      })}
      {/* {
        Platform.select({
          ios:
            <Button
              title='Pass Data Back'
              onPress={() => navigation.navigate('Feed', { data: "We have new data!" })}
            />,
          android:
            <TouchableOpacity
              onPress={() => navigation.navigate('Feed', { data: "We have new data!" })}>
              <Text style={styles.androidButtonText}>Pass Data Back</Text>
            </TouchableOpacity>
        })
      } */}
    </View>
  );
};

export default Detail;
