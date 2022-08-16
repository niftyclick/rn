import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { PublicKey, Transaction } from "@solana/web3.js";
import { CameraDetailScreen } from "./components/Camera";
import { decryptPayload } from "./utils/encryption";
import {
  connect,
  disconnect,
  signMessage,
  signAndSendTransaction,
  signAllTransactions,
  signTransaction,
} from "./utils/transactions";

export default function App() {
  const [deepLink, setDeepLink] = useState<string>("");
  const scrollViewRef = useRef<any>(null);
  const [showCamera, setShowCamera] = useState(false);

  // store dappKeyPair, sharedSecret, session and account SECURELY on device
  // to avoid having to reconnect users.
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState<PublicKey>();

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  const handleDeepLink = ({ url }: Linking.EventType) => {
    setDeepLink(url);
  };

  // handle inbounds links
  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get("errorCode")) {
      console.log(JSON.stringify(Object.fromEntries([...params]), null, 2));
      return;
    }

    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );

      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );

      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPhantomWalletPublicKey(new PublicKey(connectData.public_key));

      console.log(JSON.stringify(connectData, null, 2));
    } else if (/onDisconnect/.test(url.pathname)) {
      console.log("Disconnected!");
    } else if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      console.log(JSON.stringify(signAndSendTransactionData, null, 2));
    } else if (/onSignAllTransactions/.test(url.pathname)) {
      const signAllTransactionsData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      const decodedTransactions = signAllTransactionsData.transactions.map((t: string) =>
        Transaction.from(bs58.decode(t))
      );

      console.log(JSON.stringify(decodedTransactions, null, 2));
    } else if (/onSignTransaction/.test(url.pathname)) {
      const signTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      const decodedTransaction = Transaction.from(bs58.decode(signTransactionData.transaction));

      console.log(JSON.stringify(decodedTransaction, null, 2));
    } else if (/onSignMessage/.test(url.pathname)) {
      const signMessageData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      console.log(JSON.stringify(signMessageData, null, 2));
    }
  }, [deepLink]);

  return (
    <View style={{ flex: 1, backgroundColor: "#333" }}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "#111",
            padding: 20,
            paddingTop: 100,
            flexGrow: 1,
          }}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
          style={{ flex: 1 }}
        ></ScrollView>
      </View>
      {showCamera ? (
        <View style={{ flex: 0, paddingTop: 20, paddingBottom: 40 }}>
          <Btn title="Connect" onPress={() => connect(dappKeyPair)} />
          <Btn title="Disconnect" onPress={() => disconnect(session, sharedSecret, dappKeyPair)} />
          <Btn
            title="Sign And Send Transaction"
            onPress={() =>
              signAndSendTransaction(session, sharedSecret, dappKeyPair, phantomWalletPublicKey)
            }
          />
          <Btn
            title="Sign All Transactions"
            onPress={() =>
              signAllTransactions(session, sharedSecret, dappKeyPair, phantomWalletPublicKey)
            }
          />
          <Btn
            title="Sign Transaction"
            onPress={() =>
              signTransaction(session, sharedSecret, dappKeyPair, phantomWalletPublicKey)
            }
          />
          <Btn
            title="Sign Message"
            onPress={() => signMessage(session, sharedSecret, dappKeyPair)}
          />
        </View>
      ) : (
        <CameraDetailScreen />
      )}
    </View>
  );
}

const Btn = ({ title, onPress }: { title: string; onPress: () => Promise<void> }) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};
