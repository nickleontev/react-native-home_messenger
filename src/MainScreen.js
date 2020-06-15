import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../src/AppHeaderIcon";

export const MainScreen = ({ navigation }) => {
//   navigationOptions = {
//     headerRight: () => <Text>123</Text>
//   };

  const openPostHandler = post => {
    navigation.navigate("Post", { postId: post.id, date: post.date });
  };

  return <View style={styles.wrapper}></View>;
};

MainScreen.navigationOptions = {
  header: "Мой блог",
  headerRight: () => <Text>123</Text>
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
});
