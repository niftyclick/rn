import { PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import nacl from "tweetnacl";
import { NiftyContext, NiftyState } from "./types";

export const NiftyAppContext = React.createContext<NiftyContext>(null);

export const NiftyAppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const initialState: NiftyState = {
    dappKeyPair: nacl.box.keyPair(),
    sharedSecret: new Uint8Array([]),
    phantomWalletPublicKey: PublicKey.default,
    session: "",
  };
  const [state, setState] = useState(initialState);

  const updateState = (newState: NiftyState) => {
    setState({
      ...newState,
      ...state,
    });
  };

  return (
    <NiftyAppContext.Provider value={{ state, updateState }}>{children}</NiftyAppContext.Provider>
  );
};
