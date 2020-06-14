import React from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";
import { SERVER_URL, SIGN_UP } from "../../rest/url-constant.js";
import { Messages } from "../../localization/messages";
import { styles } from "../../styles/styles.js";
import { signInUpElements } from "../../localization/signInUpElements.js";


const SignUpTab = () => {
  const [data, setData] = React.useState({
    login: "",
    password: "",
    name: "",
    surname: "",
    isValidUsername: false,
    isValidPassword: false,
    isValidName: false,
    isValidSurname: false
  });

  async function getSignUpResult(username, password, name, surname) {
    try {
      let response = await fetch(SERVER_URL + SIGN_UP, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: username,
          password: password,
          name: name,
          surname: surname
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
      Alert.alert(
        Messages.registrationSuccesfulTitle,
        Messages.registrationSuccesfulMessage
      );

      setData({
        login: "",
        password: "",
        name: "",
        surname: ""
      });
    } else {
      console.log("here!");
      Alert.alert(
        Messages.registrationFailedTitle,
        Messages.registrationFailedMessage
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

  const nameInputChange = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        name: val,
        isValidName: true
      });
    } else {
      setData({
        ...data,
        name: val,
        isValidName: false
      });
    }
  };

  const surnameInputChange = val => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        surname: val,
        isValidSurname: true
      });
    } else {
      setData({
        ...data,
        surname: val,
        isValidSurname: false
      });
    }
  };

  const isDisabled = (
    isValidUsername,
    isValidPassword,
    isValidName,
    isValidSurname
  ) => {
    if (isValidUsername && isValidPassword && isValidName && isValidSurname) {
      return false;
    } else return true;
  };

  const onSignUp = (login, password, name, surname) => {
    getSignUpResult(login, password, name, surname).then(json =>
      whenSuccess(json)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        //ref={component => (_usernameInput = component)}
        value={data.login}
        style={styles.sign_in_up_input}
        onChangeText={val => usernameInputChange(val)}
        placeholder={signInUpElements.username}
      />
      <TextInput
        //ref={component => (_passwordInput = component)}
        value={data.password}
        style={styles.sign_in_up_input}
        onChangeText={val => passwordInputChange(val)}
        placeholder={signInUpElements.password}
        secureTextEntry={true}
      />

      <TextInput
        //ref={component => (_nameInput = component)}
        value={data.name}
        style={styles.sign_in_up_input}
        onChangeText={val => nameInputChange(val)}
        placeholder={signInUpElements.name}
      />

      <TextInput
        //ref={component => (_surnameInput = component)}
        value={data.surname}
        style={styles.sign_in_up_input}
        onChangeText={val => surnameInputChange(val)}
        placeholder={signInUpElements.surname}
      />

      <Button
        title={signInUpElements.signUpButton}
        disabled={
          !(
            data.isValidName &&
            data.isValidSurname &&
            data.isValidUsername &&
            data.isValidPassword
          )
        }
        onPress={() => {
          onSignUp(data.login, data.password, data.name, data.surname);
        }}
      />
    </View>
  );
};

export default SignUpTab;
