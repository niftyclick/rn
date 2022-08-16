import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Header from "../components/Header";
import MintsScreen from "../screens/MintsScreen";

const screens = {
  Mints: {
    screen: MintsScreen,
    navigationOptions: (props) => {
      return {
        headerTitle: () => <Header navigation={props.navigation} title="Minted NFTs" />,
      };
    },
  },
};

const ShowMintsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#111",
    headerStyle: {
      backgroundColor: "#eee",
      height: 100,
      borderBottomColor: "#444",
      borderBottomWidth: 1,
    },
  },
});

export default ShowMintsStack;
