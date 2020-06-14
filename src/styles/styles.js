import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 36,
    marginBottom: 16
  },
  // androidButtonText: {
  //   color: "blue",
  //   fontSize: 20
  // },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  },
  sign_in_up_input: {
    width:'80%',
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor:'gray',
    marginBottom: 10
  },
  sign_in_up_button: {
    width:'40%',
    height: 45,
    padding: 10,
    borderColor:'gray',
    color: 'red',
    marginTop: '20%'
  }
});
