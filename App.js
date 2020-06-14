import React from "react";
import Feed from "./src/feed";
import Detail from "./src/detail";
import ChatListScreen from "./src/ChatListScreen";
import Map from "./src/MapScreen"

import Screen1 from "./src/screens/drawer/screen1";
import Screen2 from "./src/screens/drawer/screen2";
import Screen3 from "./src/screens/drawer/screen3";

import ChatScreen from "./src/back_up_screen/ChatScreen";

import Tab1 from "./src/screens/tabs/Tab1";
import SignInTab from "./src/screens/tabs/SignInTab";
import SignUpTab from "./src/screens/tabs/SignUpTab";

import { appContent } from "./src/localization/appContent";
import { signInUpElements } from "./src/localization/signInUpElements";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Appearance,
  useColorScheme,
  AppearanceProvider
} from "react-native-appearance";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

App = () => {
  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: "white",
      background: "white",
      card: "#008577",
      text: "white",
      border: "green"
    }
  };

  createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        children={this.createDrawer}
        options={{
          title: appContent.appName
        }}
      />

      <Stack.Screen
        name="Top Tabs"
        children={this.createTopTabs}
        options={{
          title: appContent.appName
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detail Screen"
        }}
      />
      <Stack.Screen name="Bottom Tabs" children={this.createBottomTabs} />
    </Stack.Navigator>
  );

  createDrawer = () => (
    <Drawer.Navigator>
      <Drawer.Screen name="Chats" component={ChatListScreen} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Contacts" component={ChatScreen} />
      <Drawer.Screen name="Settings" component={Map} />
    </Drawer.Navigator>
  );

  createTopTabs = props => {
    return (
      <MaterialTopTabs.Navigator>
        {/* <MaterialTopTabs.Screen
        name="Tab 1"
        component={Tab1}
       options={{ title: props.route.params.name }}
      /> */}
        <MaterialTopTabs.Screen
          name={signInUpElements.signInTab}
          component={SignInTab}
        />
        <MaterialTopTabs.Screen
          name={signInUpElements.signUpTab}
          component={SignUpTab}
        />
      </MaterialTopTabs.Navigator>
    );
  };

  createBottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen
          name="Tab 1"
          style={{ marginBottom: 16 }}
          component={Tab1}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <Icon style={[{ color: "white" }]} size={25} name={"home"} />
            )
          }}
        />
        <MaterialBottomTabs.Screen
          name="Tab 2"
          component={LogInTab}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => (
              <Icon style={[{ color: "white" }]} size={25} name={"human"} />
            )
          }}
        />
        <MaterialBottomTabs.Screen
          name="Tab 3"
          component={Tab3}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: () => (
              <Icon style={[{ color: "white" }]} size={25} name={"map"} />
            )
          }}
        />
      </MaterialBottomTabs.Navigator>
    );
  };

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == "dark" ? DarkTheme : MyTheme}>
        {this.createHomeStack()}
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
