import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import MintImageStack from "./MintImageStack";
import ShowMintsStack from "./ShowMintsStack";

const screens = {
  MintImages: {
    screen: MintImageStack,
  },
  Mints: {
    screen: ShowMintsStack,
  },
};

const rootDrawer = createDrawerNavigator(screens);

export default createAppContainer(rootDrawer);
