import { Connection, SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import * as Linking from "expo-linking";
import { encryptPayload } from "./encryption";
import {
  buildUrl,
  NETWORK,
  onConnectRedirectLink,
  onDisconnectRedirectLink,
  onSignMessageRedirectLink,
  onSignTransactionRedirectLink,
  onSignAndSendTransactionRedirectLink,
} from "./helpers";

const connection = new Connection(NETWORK);

export const connect = async (dappKeyPair) => {
  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    cluster: "devnet",
    app_url: "https://phantom.app",
    redirect_link: onConnectRedirectLink,
  });

  const url = buildUrl("connect", params);
  Linking.openURL(url);
};

export const disconnect = async (session: string, sharedSecret: Uint8Array, dappKeyPair) => {
  const payload = {
    session,
  };
  const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: onDisconnectRedirectLink,
    payload: bs58.encode(encryptedPayload),
  });

  const url = buildUrl("disconnect", params);
  Linking.openURL(url);
};

export const signMessage = async (session: string, sharedSecret: Uint8Array, dappKeyPair) => {
  const message = "To avoid digital dognappers, sign below to authenticate with CryptoCorgis.";

  const payload = {
    session,
    message: bs58.encode(Buffer.from(message)),
  };

  const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: onSignMessageRedirectLink,
    payload: bs58.encode(encryptedPayload),
  });

  console.log("Signing message...");
  const url = buildUrl("signMessage", params);
  Linking.openURL(url);
};

export const createTransferTransaction = async (phantomWalletPublicKey: PublicKey) => {
  if (!phantomWalletPublicKey) throw new Error("missing public key from user");
  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: phantomWalletPublicKey,
      toPubkey: phantomWalletPublicKey,
      lamports: 100,
    })
  );
  transaction.feePayer = phantomWalletPublicKey;
  console.log("Getting recent blockhash");
  const anyTransaction: any = transaction;
  anyTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  return transaction;
};

export const signAndSendTransaction = async (
  session: string,
  sharedSecret: Uint8Array,
  dappKeyPair,
  phantomWalletPublicKey: PublicKey
) => {
  const transaction = await createTransferTransaction(phantomWalletPublicKey);

  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false,
  });

  const payload = {
    session,
    transaction: bs58.encode(serializedTransaction),
  };
  const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: onSignAndSendTransactionRedirectLink,
    payload: bs58.encode(encryptedPayload),
  });

  console.log("Sending transaction...");
  const url = buildUrl("signAndSendTransaction", params);
  Linking.openURL(url);
};

export const signTransaction = async (
  session: string,
  sharedSecret: Uint8Array,
  dappKeyPair,
  phantomWalletPublicKey: PublicKey
) => {
  const transaction = await createTransferTransaction(phantomWalletPublicKey);

  const serializedTransaction = bs58.encode(
    transaction.serialize({
      requireAllSignatures: false,
    })
  );

  const payload = {
    session,
    transaction: serializedTransaction,
  };

  const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    nonce: bs58.encode(nonce),
    redirect_link: onSignTransactionRedirectLink,
    payload: bs58.encode(encryptedPayload),
  });

  console.log("Signing transaction...");
  const url = buildUrl("signTransaction", params);
  Linking.openURL(url);
};
