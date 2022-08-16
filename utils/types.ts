import { BoxKeyPair } from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

export interface NiftyState {
  dappkeypair: BoxKeyPair;
  sharedsecret: Uint8Array;
  phantomWalletPublicKey: PublicKey;
  session: string;
}

export type NiftyContext = {
  state: NiftyState;
  updateState: (newState: NiftyState) => void;
};
