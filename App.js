import TodoOverviewScreen from "./screens/TodoOverviewScreen";
import CompletedTodosOverviewScreen from "./screens/CompletedTodosOverviewScreen";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

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
        }
      }
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
