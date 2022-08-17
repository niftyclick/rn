import "react-native-reanimated";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import 'react-native-gesture-handler';
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import { registerRootComponent } from 'expo';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { PublicKey, Transaction } from "@solana/web3.js";
import { decryptPayload } from "./utils/encryption";
import { NativeBaseProvider, Button, VStack } from "native-base";
import { useFonts } from "expo-font";
import { NiftyAppProvider } from "./utils/context";
import DrawerNavigator from "./routes/Drawer";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [deepLink, setDeepLink] = useState<string>("");
  const scrollViewRef = useRef<any>(null);

  // store dappKeyPair, sharedSecret, session and account SECURELY on device
  // to avoid having to reconnect users.
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState<PublicKey>();

  let [fontsLoaded] = useFonts({
    ubuntu: require("./assets/fonts/ubuntu.ttf"),
    nunito: require("./assets/fonts/nunito.ttf"),
    shizuru: require("./assets/fonts/Shizuru-Regular.ttf"),
    headerBold: require("./assets/fonts/TheNautigal-Bold.ttf"),
    headerNormal: require("./assets/fonts/TheNautigal-Regular.ttf"),
  });

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

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // handle inbounds links
  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get("errorCode")) {
      console.log(JSON.stringify(Object.fromEntries([...params]), null, 2));
      return;
    }

    if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );

      console.log(JSON.stringify(signAndSendTransactionData, null, 2));
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

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NiftyAppProvider>
      <NativeBaseProvider>
        {/* <View onLayout={onLayoutRootView}> */}
          <DrawerNavigator />
          <StatusBar style="dark" />
        {/* </View> */}
      </NativeBaseProvider>
    </NiftyAppProvider>
  );
}


registerRootComponent(App);