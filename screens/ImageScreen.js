import { Button, VStack } from "native-base";
import React from "react";
import ImagePickerExample from "../components/ImagePicker";

const ImageScreen = (props) => {
  return (
    <VStack alignItems="center" justifyContent="center" space="10" mx="4">
      <ImagePickerExample />
      <Button
        colorScheme="secondary"
        size="lg"
        onPress={() => props.navigation.navigate("Metadata")}
      >
        Add Metadata
      </Button>
    </VStack>
  );
};

export default ImageScreen;
