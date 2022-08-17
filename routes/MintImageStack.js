import { createStackNavigator } from "@react-navigation/stack";
import ConnectScreen from "../screens/ConnectScreen";
import ImageScreen from "../screens/ImageScreen";
import MetadataScreen from "../screens/MetadataScreen";

const Stack = createStackNavigator();

const MintStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Connect">
      <Stack.Screen
        name="Connect"
        component={ConnectScreen}
        options={{ headerShown: false, headerBackAccessibilityLabel: true }}
      />
      <Stack.Screen name="Images" component={ImageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Metadata" component={MetadataScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MintStackNavigator;
