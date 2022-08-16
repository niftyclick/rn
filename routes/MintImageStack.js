import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ConnectScreen from "../screens/ConnectScreen";
import ImageScreen from "../screens/ImageScreen";
import MetadataScreen from "../screens/MetadataScreen";
import Header from "../components/Header";

const screens = {
  Connect: {
    screen: ConnectScreen,
    navigationOptions: (props) => {
      return {
        headerTitle: () => <Header navigation={props.navigation} title="Niftyclick" />,
      };
    },
  },
  Images: {
    screen: ImageScreen,
    navigationOptions: {
      title: "Select Image",
    },
  },
  Metadata: {
    screen: MetadataScreen,
    navigationOptions: {
      title: "Add your metadata",
    },
  },
};

const MintImageStack = createStackNavigator(screens, {
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

export default createAppContainer(MintImageStack);
