import { BoxKeyPair } from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

export interface NiftyState {
  dappkeypair: BoxKeyPair;
  sharedsecret: Uint8Array;
  phantomWalletPublicKey: string;
  session: PublicKey;
}

export type NiftyContext = {
  state: NiftyState;
  updateState: (newState: NiftyState) => void;
};
