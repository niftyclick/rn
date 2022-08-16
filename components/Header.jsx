import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";

const Header = (props) => {
  const openMenu = () => {
    props.navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <AntDesign name="menuunfold" size={24} color="black" onPress={openMenu} style={styles.icon} />
      <View>
        <Text style={styles.headerText}>{props.title}</Text>
      </View>
    </View>
  );
};

export default Header;
