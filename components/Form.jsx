import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "../styles/styles";
import _ from "lodash";
import { Button, Heading, Input, TextArea, VStack } from "native-base";

const MetadataForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setURI] = useState("");

  const handleSubmit = () => {
    if (name === "" || description === "") {
      // make a post request to the server and get URI back
    }
  };

  return (
    <VStack alignItems="center" justifyContent="center" space="10" mx="6" my="10">
      <Heading>Metadata</Heading>
      <Input
        size="lg"
        isRequired
        placeholder="NFT Title"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextArea
        h="100"
        size="lg"
        isRequired
        multiline
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
        minHeight={60}
      />

      <Button colorScheme="secondary" onPress={handleSubmit} size="lg">
        Submit metadata
      </Button>
    </VStack>
  );
};
export default MetadataForm;
