import React from "react";
import { View } from "react-native";
import TodoOverviewScreen from "./screens/TodoOverviewScreen";
import CompletedTodosOverviewScreen from "./screens/CompletedTodosOverviewScreen";
import { createAppContainer } from "react-navigation";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";

function App() {
  return (
    <View style={{ height: "100%" }}>
      <TodoOverviewScreen />
    </View>
  );
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: TodoOverviewScreen
    },
    Completed: {
      screen: CompletedTodosOverviewScreen
    }
  },
  {
    animationEnabled: true,
    tabBarPosition: "bottom",
    swipeEnabled: true
  }
);

export default createAppContainer(TabNavigator);
