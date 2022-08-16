import { Button, VStack } from "native-base";
import React, { useState } from "react";

const ConnectScreen = (props) => {
  const [connected, setConnected] = useState(true);
  return (
    <VStack alignItems="center" justifyContent="center" my="10">
      {connected ? (
        <Button colorScheme="secondary" w="1/2" onPress={() => props.navigation.navigate("Images")}>
          Select Image
        </Button>
      ) : (
        <Button colorScheme="secondary" w="1/2" onPress={() => setConnected(true)}>
          Connect Wallet
        </Button>
      )}
    </VStack>
  );
};

export default ConnectScreen;
