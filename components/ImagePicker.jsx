import React, { useState } from "react";
import { Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, VStack } from "native-base";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <VStack alignItems="center" justifyContent="center" space="10" mx="4" my="10">
      <Button size="lg" onPress={pickImage} colorScheme="secondary">
        Pick an image
      </Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </VStack>
  );
}
