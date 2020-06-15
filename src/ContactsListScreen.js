import {
  useNavigation,
  useRoute,
  useFocusEffect
} from "@react-navigation/native";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import * as SQLite from "expo-sqlite";
let db = SQLite.openDatabase("db.db");

function Item1({ id, title, item, onSelect }) {
  return (
    <TouchableOpacity style={[styles.item]} onPress={() => onSelect(item)}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={require("./images/user_profile.png")}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ContactsListScreen({ navigation }) {
  const [selected, setSelected] = React.useState(new Map());
  const route = useRoute();
  const [contacts, setContact] = useState([]);

  const update = () => {
    // console.log(db);
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * from Contacts",
        [],
        (tx, { rows }) => {
          setContact(() => {
            return rows._array;
          });
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      update();
      return () => ({});
    }, [navigation])
  );

  async function getChats() {}

  const onSelect1 = React.useCallback(
    item => {
      console.log("\nonSelect1 start");
      if (item != undefined) {
        console.log("id===" + item.id);
        console.log("item===" + item.name);
        // navigation.navigate("Chat", { data: item });
      }
      console.log("onSelect1 end\n");
    },
    [selected]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <Item1
            id={item.id}
            title={item.login}
            item={item}
            onSelect={onSelect1}
          />
        )}
        keyExtractor={item => item.id.toString()}
        extraData={selected}
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#49CDBF",
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 16
  },
  title: {
    fontSize: 20,
    marginLeft: 40,
    position: "absolute"
  },
  tinyLogo: {
    width: 30,
    height: 30
  }
});
