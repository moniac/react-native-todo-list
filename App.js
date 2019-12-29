import React from "react";
import TodoOverviewScreen from "./screens/TodoOverviewScreen";
import CompletedTodosOverviewScreen from "./screens/CompletedTodosOverviewScreen";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: TodoOverviewScreen,
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          // perform your logic here
          // this is mandatory to perform the actual switch
          // don't call this if you want to prevent focus
          console.log("HOME");
          defaultHandler();
        },
        tabBarIcon: <Ionicons name="ios-home" size={26} color="white" />
      }
    },
    Completed: {
      screen: CompletedTodosOverviewScreen,
      navigationOptions: {
        tabBarIcon: (
          <Ionicons
            name="ios-checkmark-circle-outline"
            size={26}
            color="white"
          />
        )
      }
    }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    swipeEnabled: true,
    style: {
      backgroundColor: "white"
    },
    tabBarOptions: {
      showIcon: true,
      iconStyle: { opacity: 0.9 },
      indicatorStyle: {
        backgroundColor: "white"
      }
    }
  }
);

export default createAppContainer(TabNavigator);
