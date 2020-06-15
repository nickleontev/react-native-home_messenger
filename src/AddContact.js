import React from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SERVER_URL, CREATE_PRIVATE_CHAT } from "../src/rest/url-constant";
import { Messages } from "../src/localization/messages";
import { signInUpElements } from "../src/localization/signInUpElements";
import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";

import { styles } from "./styles/styles";

let db = SQLite.openDatabase("db.db");

const AddContact = () => {
  const [data, setData] = React.useState({
    login: ""
  });

  async function getAddContactResult(username) {
    try {
      let response = await fetch(SERVER_URL + CREATE_PRIVATE_CHAT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token"))
        },
        body: JSON.stringify({
          invitee: username,
        })
      });

      let json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      Alert.alert(
        Messages.connectionErrorTitle,
        Messages.connectionErrorMessage
      );
    }
  }

  function whenSuccess(json) {
    if (json.success) {

      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO Contacts(login, name, surname) VALUES (?,?,?)",
          [json.contact.login, json.contact.name, json.contact.surname]
        );
      });

      navigation.navigate("Contacts");

      // navigation.push('Chats');
    } else {
      Alert.alert(
        Messages.usernameNotFoundTitle,
        Messages.usernameNotFoundMessage
      );
    }
  }

  const usernameInputChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        login: val,
        isValidUsername: true
      });
    } else {
      setData({
        ...data,
        login: val,
        isValidUsername: false
      });
    }
  };

  const navigation = useNavigation();

  const onSignIn = (login) => {
    getAddContactResult(login)
      .then(json => whenSuccess(json))
      .then(
        SecureStore.getItemAsync("token", {}).then(value => {
          console.log(value);
        })
      );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.sign_in_up_input}
        onChangeText={val => usernameInputChange(val)}
        placeholder={signInUpElements.username}
      />

      <Button
        title={signInUpElements.addContactButton}
        disabled={!(data.isValidUsername)}
        onPress={() => {
          onSignIn(data.login);
        }}
      />
    </View>
  );
};

export default AddContact;
