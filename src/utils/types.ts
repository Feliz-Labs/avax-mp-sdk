import type { BigNumber, BigNumberish } from '@ethersproject/bignumber';

export type ECSignature = {
  v: number;
  r: string;
  s: string;
};

export type SignatureStruct = {
  signatureType: number; // 2 for EIP-712, 4 for PRESIGNED
  v: number;
  r: string;
  s: string;
};

export type FeeStruct = {
  recipient: string;
  amount: BigNumberish;
  feeData: string | Array<number>;
};

export type PropertyStruct = {
  propertyValidator: string;
  propertyData: string | Array<number>;
};

export type ERC1155OrderStruct = {
  direction: BigNumberish;
  maker: string;
  taker: string;
  expiry: BigNumberish;
  nonce: BigNumberish;
  erc20Token: string;
  erc20TokenAmount: BigNumberish;
  fees: FeeStruct[];
  erc1155Token: string;
  erc1155TokenId: BigNumberish;
  erc1155TokenProperties: PropertyStruct[];
  erc1155TokenAmount: BigNumberish;
};

export type ERC721OrderStruct = {
  direction: BigNumberish;
  maker: string;
  taker: string;
  expiry: BigNumberish;
  nonce: BigNumberish;
  erc20Token: string;
  erc20TokenAmount: BigNumberish;
  fees: FeeStruct[];
  erc721Token: string;
  erc721TokenId: BigNumberish;
  erc721TokenProperties: PropertyStruct[];
};

export type NftOrderV4 = ERC1155OrderStruct | ERC721OrderStruct;

export interface SignedERC721OrderStruct extends ERC721OrderStruct {
  signature: SignatureStruct;
  rawSignature: string;
}

export interface SignedERC1155OrderStruct extends ERC1155OrderStruct {
  signature: SignatureStruct;
  rawSignature: string;
}

export type SignedNftOrderV4 =
  | SignedERC721OrderStruct
  | SignedERC1155OrderStruct;

export interface UserFacingERC721AssetDataSerializedV4 {
  tokenAddress: string;
  tokenId: string;
  type: 'ERC721';
}

export interface UserFacingERC20AssetDataSerializedV4 {
  tokenAddress: string;
  type: 'ERC20';
  amount: string;
}