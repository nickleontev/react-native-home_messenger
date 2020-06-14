import React from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SERVER_URL, SIGN_IN } from "../../rest/url-constant";
import { Messages } from "../../localization/messages";
import { signInUpElements } from "../../localization/signInUpElements";
import * as SecureStore from "expo-secure-store";

import { styles } from "../../styles/styles.js";

const SignInTab = () => {
  const [data, setData] = React.useState({
    login: "",
    password: "",
    isValidUsername: false,
    isValidPassword: false
  });

  async function getSignInResult(username, password) {
    try {
      let response = await fetch(SERVER_URL + SIGN_IN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: username,
          password: password
        })
      });

      let json = await response.json();
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
      SecureStore.setItemAsync("token", json.token, {}).then(value => {
        // navigation.navigate("Chats");
        navigation.navigate('Chats', { update: "up" });
        SecureStore.setItemAsync("login", data.login, {});
      });

      // navigation.push('Chats');
    } else {
      SecureStore.setItemAsync("token", "", {});
      Alert.alert(
        Messages.autenficationFailedTitle,
        Messages.autenficationFailedMessage
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

  const passwordInputChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  };

  const navigation = useNavigation();

  const onSignIn = (login, password) => {
    getSignInResult(login, password)
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
      <TextInput
        style={styles.sign_in_up_input}
        onChangeText={val => passwordInputChange(val)}
        placeholder={signInUpElements.password}
        secureTextEntry={true}
      />

      <Button
        title={signInUpElements.signInButton}
        disabled={!(data.isValidUsername && data.isValidPassword)}
        onPress={() => {
          onSignIn(data.login, data.password);
        }}
      />
    </View>
  );
};

export default SignInTab;
