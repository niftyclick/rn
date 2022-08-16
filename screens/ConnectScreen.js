import { Button, VStack } from "native-base";
import React, { useState, useContext } from "react";
import { NiftyAppContext } from "../utils/context";
import { connect } from "../utils/transactions";

const ConnectScreen = (props) => {
  const [connected, setConnected] = useState(false);
  const { state, updateState } = useContext(NiftyAppContext);

  const handleConnect = async () => {
    const data = connect(state.dappKeyPair);

    updateState(data);
    setConnected(true);
  };

  return (
    <VStack alignItems="center" justifyContent="center" my="10">
      {connected ? (
        <Button colorScheme="secondary" w="1/2" onPress={() => props.navigation.navigate("Images")}>
          Select Image
        </Button>
      ) : (
        <Button colorScheme="secondary" w="1/2" onPress={handleConnect}>
          Connect Wallet
        </Button>
      )}
    </VStack>
  );
};

export default ConnectScreen;
