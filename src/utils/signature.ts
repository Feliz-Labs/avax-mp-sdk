import { hexDataLength, hexDataSlice } from "@ethersproject/bytes";
import { ECSignature, NftOrderV4 } from "./types";
import {
  ERC721ORDER_STRUCT_ABI,
  ERC721ORDER_STRUCT_NAME,
  FEE_ABI,
  ONE_TWENTY_EIGHT_BIT_LENGTH,
  PROPERTY_ABI,
  RESERVED_APP_ID_PREFIX,
  RESERVED_APP_ID_PREFIX_DIGITS,
  TWO_FIFTY_SIX_BIT_LENGTH,
} from "./trader_constants";
import invariant from "tiny-invariant";
import padStart from "lodash/padStart";
import padEnd from "lodash/padEnd";
import { v4 } from "uuid";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";

export const parseRawSignature = (rawSignature: string): ECSignature => {
  const hexSize = hexDataLength(rawSignature);
  // if (hexUtils.size(rpcSig) !== 65) {
  //     throw new Error(`Invalid RPC signature length: "${rpcSig}"`);
  // }
  if (hexSize !== 65) {
    throw new Error(
      `Invalid signature length, expected 65, got ${hexSize}.\n"Raw signature: ${rawSignature}"`
    );
  }
  // Some providers encode V as 0,1 instead of 27,28.
  const VALID_V_VALUES = [0, 1, 27, 28];
  // Some providers return the signature packed as V,R,S and others R,S,V.
  // Try to guess which encoding it is (with a slight preference for R,S,V).
  // let v = parseInt(rpcSig.slice(-2), 16);
  let v = parseInt(rawSignature.slice(-2), 16);

  if (VALID_V_VALUES.includes(v)) {
    // Format is R,S,V
    v = v >= 27 ? v : v + 27;
    return {
      // r: hexDataSlice.slice(rpcSig, 0, 32),
      // s: hexUtils.slice(rpcSig, 32, 64),
      r: hexDataSlice(rawSignature, 0, 32),
      s: hexDataSlice(rawSignature, 32, 64),
      v,
    };
  }
  // Format should be V,R,S
  // v = parseInt(rpcSig.slice(2, 4), 16);
  v = parseInt(rawSignature.slice(2, 4), 16);
  if (!VALID_V_VALUES.includes(v)) {
    throw new Error(
      `Cannot determine RPC signature layout from V value: "${rawSignature}"`
    );
  }
  v = v >= 27 ? v : v + 27;
  return {
    v,
    r: hexDataSlice(rawSignature, 1, 33),
    s: hexDataSlice(rawSignature, 33, 65),
  };
};

const checkIfStringContainsOnlyNumbers = (val: string) => {
  const onlyNumbers = /^\d+$/.test(val);
  return onlyNumbers;
};

export const verifyAppIdOrThrow = (appId: string) => {
  const isCorrectLength =
    appId.length <= ONE_TWENTY_EIGHT_BIT_LENGTH - RESERVED_APP_ID_PREFIX_DIGITS;
  const hasOnlyNumbers = checkIfStringContainsOnlyNumbers(appId);
  invariant(isCorrectLength, "appId must be 39 digits or less");
  invariant(
    hasOnlyNumbers,
    "appId must be numeric only (no alpha or special characters, only numbers)"
  );
};

// uuids are 128bits
export const generateRandom128BitNumber = (base = 10): string => {
  const hex = "0x" + v4().replace(/-/g, "");
  const value = BigInt(hex);
  const valueBase10String = value.toString(base); // don't convert this to a number, will lose precision
  return valueBase10String;
};

export const generateRandomV4OrderNonce = (
  appId: string = "314159"
): string => {
  if (appId) {
    verifyAppIdOrThrow(appId);
  }
  const order128 = padStart(
    generateRandom128BitNumber(),
    ONE_TWENTY_EIGHT_BIT_LENGTH,
    "0"
  );
  const appId128 = padEnd(
    `${RESERVED_APP_ID_PREFIX}${appId}`,
    ONE_TWENTY_EIGHT_BIT_LENGTH,
    "0"
  );
  const final256BitNonce = `${appId128}${order128}`;
  invariant(
    final256BitNonce.length <= TWO_FIFTY_SIX_BIT_LENGTH,
    "Invalid nonce size"
  );
  return final256BitNonce;
};

export const signOrderData = async (
  order: NftOrderV4,
  signer: ethers.Wallet
) => {
  const domain = {
    chainId: 43114,
    verifyingContract: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    name: "ZeroEx",
    version: "1.0.0",
  };
  const types = {
    [ERC721ORDER_STRUCT_NAME]: ERC721ORDER_STRUCT_ABI,
    Fee: FEE_ABI,
    Property: PROPERTY_ABI,
  };
  const value = order;

  const rawSignatureFromEoaWallet = await signer._signTypedData(
    domain,
    types,
    value
  );

  return rawSignatureFromEoaWallet;
};

export const prepareEncodedTransaction = async (
  txInput: any,
  transactionSigner: ethers.Wallet
) => {
  const signerAddress = await transactionSigner.getAddress();
  const signerNonce = await transactionSigner.provider.getTransactionCount(
    signerAddress
  );

  let constructedTransaction = {
    chainId: 43114,
    // nonce: signerNonce,
    to: "0x398BAa6FFc99126671Ab6be565856105a6118A40",
    data: "0x",
    value: "0x0",
    gasPrice: "0",
    gasLimit: "0",
  };

  if (txInput.data) {
    constructedTransaction.data = txInput.data;
  }

  if (txInput.value) {
    constructedTransaction.value = txInput.value;
  }

  const gasPrice =await transactionSigner.provider.getGasPrice();
  const gasEstimate = await transactionSigner.estimateGas(
    constructedTransaction
  );
  constructedTransaction.gasPrice = gasPrice._hex;
  // Doubled since on bulk buys the estimates are sometimes off
  constructedTransaction.gasLimit = gasEstimate.mul("2")._hex;

  return constructedTransaction;
};

export const signOrder = async (order: NftOrderV4, signer: ethers.Wallet) => {
  const rawSignature = await signOrderData(order, signer);
  const ecSignature = parseRawSignature(rawSignature);
  const signedOrder = {
    ...order,
    signature: {
      signatureType: 2,
      r: ecSignature.r,
      s: ecSignature.s,
      v: ecSignature.v,
    },
    rawSignature,
  };

  return signedOrder;
};
