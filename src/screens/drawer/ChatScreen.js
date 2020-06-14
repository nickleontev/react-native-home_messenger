import React, { Component } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { styles } from "../../styles/styles.js";

// export default class ChatScreen extends React.Component {
//   state = {
//     messages: []
//   };

//   get user() {
//     return {
//       _id: 1,
//       name: this.props.name
//     };
//   }

//   render() {
//     const chat = (
//       <GiftedChat messages={this.state.messages} onSend={1} user={this.user} />
//     );

//     if (Platform.OS === "android") {
//       return (
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior="padding"
//           keyboardVericalOffset={30}
//           enabled
//         >
//           {chat}
//         </KeyboardAvoidingView>
//       );
//     }

//     return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
//   }
// }

// state = {
//         messages: []
//       };
Screen1 = () => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    keyboardVericalOffset={30}
    enabled
  >
    <GiftedChat messages={[]} onSend={1} user={1} />
  </KeyboardAvoidingView>
);

export default Screen1;
