import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MintImageStack from "./MintImageStack";
import ShowMintsStack from "./ShowMintsStack";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Mint NFTsk">
        <Drawer.Screen name="Mint NFT" component={MintImageStack} />
        <Drawer.Screen name="View NFTs" component={ShowMintsStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
