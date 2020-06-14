import {
  useNavigation,
  useRoute,
  useFocusEffect
} from "@react-navigation/native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
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
import { GET_CHATS, SERVER_URL } from "./rest/url-constant";

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" }
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

// function Item1({ id, title ,onSelect }) {
//   return (
//     <TouchableOpacity style={[styles.item]} onPress={() => onSelect(id)}>
//       <View>
//         <Image
//           style={styles.tinyLogo}
//           source={require("./images/user_profile.png")}
//         />
//         <Text style={styles.title}>{title}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

function Item1({ id, title, item, onSelect }) {
  if (title != "Saved Messages") {
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
  } else {
    return (
      <TouchableOpacity style={[styles.item]} onPress={() => onSelect(item)}>
        <View>
          <Image
            style={styles.tinyLogo}
            source={require("./images/saved.png")}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default function ChatListScreen({ navigation }) {
  const [selected, setSelected] = React.useState(new Map());
  const route = useRoute();
  const [chats, setChats] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getChats()
        .then(response => {
          if (!Array.isArray(response)) {
            console.log("\nChatListScreen: response is invalid, response=");
            console.log(response);
            console.log("ChatListScreen: end response");
            navigation.navigate("Top Tabs");
          } else {
            setChats(response);
          }
        })
        .catch(error => {
          console.log(error);
        });

      return () => ({});
    }, [navigation])
  );

  async function getChats() {
    console.log("ChatListScreen#getChats path=" + SERVER_URL + GET_CHATS);
    try {
      let response = await fetch(SERVER_URL + GET_CHATS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token"))
        }
      });

      let json = await response.json();

      return json;
    } catch (error) {
      console.log("ChatListScreen: some connection error " + error);
      Alert.alert(
        Messages.connectionErrorTitle,
        Messages.connectionErrorMessage
      );
      throw error;
    }
  }

  const onSelect = React.useCallback(
    id => {
      // const newSelected = new Map(selected);
      // newSelected.set(id, !selected.get(id));
      // setSelected(newSelected);

      if (chats != undefined) {
        console.log("chats=");
        console.log("id="+id);
        console.log(chats);
        console.log(chats[id]);
        // chats.forEach(function(item, index, array) {
        //   console.log(index);
        // });

        //console.log(chats);
        //navigation.navigate("Chat", { data: chats[id] });
      }
      console.log(Number.isInteger(id));
      console.log(id);
    },
    [selected]
  );


  
  const onSelect1 = React.useCallback(
    item => {
      console.log("\nonSelect1 start");
      if (item != undefined) {
        console.log("id==="+item.id);
        console.log("item==="+item.name);
        navigation.navigate("Chat", { data: item });
      }
      console.log("onSelect1 end\n");
    
    },
    [selected]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={(onSelect, whenSuc)}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      /> */}

      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <Item1 id={item.id} title={item.name} item={item} onSelect={onSelect1} />
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
