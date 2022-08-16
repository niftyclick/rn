import { BoxKeyPair } from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

export interface NiftyState {
  dappKeyPair: BoxKeyPair;
  sharedSecret: Uint8Array;
  phantomWalletPublicKey: PublicKey;
  session: string;
}

export type NiftyContext = {
  state: NiftyState;
  updateState: (newState: NiftyState) => void;
};
