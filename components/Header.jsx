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
      <View style={{ flex: 1, backgroundColor: "transparent" }} />
      <AntDesign name="menuunfold" size={24} color="black" onPress={openMenu} style={{ flex: 4 }} />
      <View style={{ flex: 8 }}>
        <Text style={{ fontWeight: "500", letterSpacing: 0.3, color: "#333", fontSize: 20 }}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
