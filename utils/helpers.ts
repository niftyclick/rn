import * as Linking from "expo-linking";

import { clusterApiUrl } from "@solana/web3.js";

export const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`;

export const NETWORK = clusterApiUrl("devnet");
export const onConnectRedirectLink = Linking.createURL("onConnect");
export const onDisconnectRedirectLink = Linking.createURL("onDisconnect");
export const onSignAndSendTransactionRedirectLink = Linking.createURL("onSignAndSendTransaction");
export const onSignAllTransactionsRedirectLink = Linking.createURL("onSignAllTransactions");
export const onSignTransactionRedirectLink = Linking.createURL("onSignTransaction");
export const onSignMessageRedirectLink = Linking.createURL("onSignMessage");
