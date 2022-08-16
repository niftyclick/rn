import { Camera } from "expo-camera";
import React, { useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, TouchableOpacity, View, Image, Button, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export function CameraDetailScreen() {
  const [type, setType] = useState("back");
  const [permission, requestCameraPermission] = Camera.useCameraPermissions();
  const [status, requestMediaPermission] = MediaLibrary.usePermissions();
  const [clicked, setClicked] = useState(false);
  const [image, setImage] = useState(
    "https://avatars.githubusercontent.com/u/109650484?s=400&u=953955669a2c724d06e73e976f07c83413400443&v=4"
  );
  const ref = useRef(null);

  const toggleCameraType = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  const _takePhoto = async () => {
    const { uri } = await ref.current.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
    setImage(uri);
    setClicked(true);
  };

  if (!permission || !status) return <View />;

  if (!permission.granted || !status.granted) {
    return (
      <View style={styles.container}>
        <Button title="Camera Access" onPress={requestCameraPermission} />
        <Button title="Gallery Access" onPress={requestMediaPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {clicked ? (
        <View style={styles.view}>
          <Image
            source={{
              uri: image,
              width: 330,
              height: 500,
            }}
          />
        </View>
      ) : (
        <Camera style={styles.camera} type={type} ref={ref} autoFocus ratio="16:9">
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.repeat} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraIcon} onPress={_takePhoto}>
              <EvilIcons name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  view: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  icons: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  camera: {
    width: "100%",
    height: "95%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 32,
  },
  repeat: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

// ImagePicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true
//   }).then(image => {
//     console.log(image);
//   })
