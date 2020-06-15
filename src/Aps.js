import React, { useState } from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import Constants from "expo-constants";
//import  SQLite  from 'expo-sqlite';
import * as SQLite from "expo-sqlite";

let db = SQLite.openDatabase("db.db");

db.transaction(tx => {
  tx.executeSql(
    "DROP TABLE IF EXISTS Contacts"
  );
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS Contacts (id integer primary key not null, login, name, surname)"
  );
});

export default function App(props) {
  //random names to pick from to add to the database
  const nameRA = ["Joe Brown", "Jane Doe", "Sherlock Holmes", "Picard"];

  //hook for displaying the names in the database
  const [names, setNames] = useState([]);

  //add the results of the database into the names hook
  const update = () => {
   // console.log(db);
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * from Contacts",
        [],
        (tx, { rows }) => {
          setNames(() => {
            let retRA = [];
            rows._array.forEach(elem => {
              retRA.unshift(elem.name);
              console.log("loginRet="+elem.login);
              console.log("nameRet="+elem.name);
              console.log("surnameRet="+elem.surname);
            });
            return retRA;
          });
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  };

  //inserts a name into the database, calls update if successful
  const addName = () => {
    let newName = ["l","n","s"];

    db.transaction(tx => {
      tx.executeSql("INSERT INTO Contacts(login, name, surname) VALUES (?,?,?)", newName, update());
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: Constants.statusBarHeight + 30,
      padding: 8,
      backgroundColor: "#ecf0f1"
    }
  });

  return (
    <View style={styles.container}>
      <Button
        title="Click to add a name."
        onPress={() => {
          addName();
        }}
      />
      <ScrollView>
        {names.map(elem => {
          return <Text>{elem}</Text>;
        })}
      </ScrollView>
    </View>
  );
}
