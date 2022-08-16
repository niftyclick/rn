import { Button, VStack } from "native-base";
import React from "react";
import MetadataForm from "../components/Form";

const MetadataScreen = () => {
  const handleMinting = () => {
    console.log("Hello");
  };

  return (
    <VStack>
      <MetadataForm />
    </VStack>
  );
};

export default MetadataScreen;
