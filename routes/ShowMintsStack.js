import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MintsScreen from "../screens/MintsScreen";

const Stack = createStackNavigator();

const MintsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="View Images">
      <Stack.Screen name="Mints" component={MintsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default MintsStackNavigator;