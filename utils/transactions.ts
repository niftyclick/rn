import { Connection, SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import nacl, { BoxKeyPair } from "tweetnacl";
import * as Linking from "expo-linking";
import { encryptPayload, decryptPayload } from "./encryption";
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

export const connect = async (dappKeyPair: BoxKeyPair) => {
  console.log({ dappKeyPair });
  const params = new URLSearchParams({
    dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
    cluster: "devnet",
    app_url: "https://phantom.app",
    redirect_link: onConnectRedirectLink,
  });

  const url = buildUrl("signTransaction", params);
  Linking.openURL(url);
};

export const disconnect = async (
  session: string,
  sharedSecret: Uint8Array,
  dappKeyPair: BoxKeyPair
) => {
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

  return {
    params,
  };
};

export const signMessage = async (
  message: string,
  session: string,
  sharedSecret: Uint8Array,
  dappKeyPair: BoxKeyPair
) => {
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
  const signMessageData = decryptPayload(params.get("data")!, params.get("nonce")!, sharedSecret);

  console.log(JSON.stringify(signMessageData, null, 2));

  return {
    data: signMessageData,
  };
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

export const signTransaction = async (
  session: string,
  sharedSecret: Uint8Array,
  dappKeyPair: BoxKeyPair,
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
