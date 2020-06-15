import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { GiftedChat } from "react-native-gifted-chat";
import { AppHeaderIcon } from "../AppHeaderIcon";
import {
  useNavigation,
  useRoute,
  useFocusEffect
} from "@react-navigation/native";
import messagesq from "./messages";
import {
  GET_ALL_GIFTED_CHAT_MESSAGE,
  SERVER_URL,
  SEND_GIFTED_MESSAGE
} from "./../rest/url-constant";
import { Messages } from "./../localization/messages";
import * as SecureStore from "expo-secure-store";

const ChatScreen = ({ route, navigation }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [login, setLogin] = useState("");

  useEffect(() => {
    navigation.setParams({
      headerRight: ()=><Text>1231232</Text>
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {

    

      getMessages()
        .then(response => {
          if (!Array.isArray(response)) {
            console.log("ChatScreen: invalid response, see bottom:");
            console.log(response);
            console.log("ChatScreen: stop seeing response.");
            navigation.navigate("Chats");
          } else {
            console.log("ChatScreen: set messages from REST");
            console.log("ChatScreen: response= ");
            console.log(response);
            setMessages(response);
            console.log("ChatScreen: set messages from REST finish");
          }
        })
        .catch(error => {
          console.log(error);
        });

      return () => ({});
    }, [route])
  );

  const onSend = (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    sendMessage(newMessages[0].text);
  };

  async function getMessages() {
    setLogin(await SecureStore.getItemAsync("login"));
    let dataFromChatListScreen = route.params;
    console.log(
      "ChatScreen#getMessages path=" + SERVER_URL + GET_ALL_GIFTED_CHAT_MESSAGE
    );

    console.log("/ndata from ChatList bellow:");
    console.log(dataFromChatListScreen);
    console.log("---");
    console.log(dataFromChatListScreen.data);
    console.log("data from ChatList end:");

    try {
      let response = await fetch(SERVER_URL + GET_ALL_GIFTED_CHAT_MESSAGE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token"))
        },
        body: JSON.stringify({
          id: dataFromChatListScreen.data.id,
          type: dataFromChatListScreen.data.type,
          name: dataFromChatListScreen.data.name
        })

        // body: dataFromChatListScreen.data
      });

      let json = await response.json();

      return json;
    } catch (error) {
      console.log("ChatScreen: some connection error: " + error);
      Alert.alert(
        Messages.connectionErrorTitle,
        Messages.connectionErrorMessage
      );
      throw error;
    }
  }

  async function sendMessage(text) {
    let dataFromChatListScreen = route.params;
    console.log(
      "ChatScreen#getMessages path=" + SERVER_URL + SEND_GIFTED_MESSAGE
    );

    console.log("\n#sendMessage:data from ChatList bellow:");
    console.log(dataFromChatListScreen);
    console.log("---");
    console.log(dataFromChatListScreen.data);
    console.log("#sendMessage: data from ChatList end:");

    try {
      let json1 = JSON.stringify({
        text: text,
        chat_id: dataFromChatListScreen.data.id
      });
      console.log("sendingJSON");
      console.log(json1);
      let response = await fetch(SERVER_URL + SEND_GIFTED_MESSAGE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token"))
        },
        body: JSON.stringify({
          text: text,
          chat_id: dataFromChatListScreen.data.id
        })

        // body: dataFromChatListScreen.data
      });

      let json = await response.json();

      return json;
    } catch (error) {
      console.log(
        "ChatScreen: some connection error while #sending message: " + error
      );
      Alert.alert(
        Messages.connectionErrorTitle,
        Messages.connectionErrorMessage
      );
      throw error;
    }
  }

  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={{
        _id: login
      }}
      // alignTop
      // alwaysShowSend
      // scrollToBottom
      // // showUserAvatar
      // renderAvatarOnTop
      // renderUsernameOnMessage
      // bottomOffset={26}
      // onPressAvatar={console.log}
      // renderInputToolbar={renderInputToolbar}
      // renderActions={renderActions}
      // renderComposer={renderComposer}
      // renderSend={renderSend}
      // renderAvatar={renderAvatar}
      // renderBubble={renderBubble}
      // renderSystemMessage={renderSystemMessage}
      // renderMessage={renderMessage}
      // renderMessageText={renderMessageText}
      // // renderMessageImage
      // renderCustomView={renderCustomView}
      // isCustomViewBottom
      // messagesContainerStyle={{ backgroundColor: "indigo" }}
      // parsePatterns={linkStyle => [
      //   {
      //     pattern: /#(\w+)/,
      //     style: linkStyle,
      //     onPress: tag => console.log(`Pressed on hashtag: ${tag}`)
      //   }
      // ]}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ChatScreen;
