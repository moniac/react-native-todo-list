import TodoOverviewScreen from "./screens/TodoOverviewScreen";
import CompletedTodosOverviewScreen from "./screens/CompletedTodosOverviewScreen";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

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
