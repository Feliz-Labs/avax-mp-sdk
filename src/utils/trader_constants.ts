import { BigNumber } from '@ethersproject/bignumber';

export const EIP712_DOMAIN_PARAMETERS = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];

export const ERC721ORDER_STRUCT_NAME = 'ERC721Order';

export const ERC721ORDER_STRUCT_ABI = [
  { type: 'uint8', name: 'direction' },
  { type: 'address', name: 'maker' },
  { type: 'address', name: 'taker' },
  { type: 'uint256', name: 'expiry' },
  { type: 'uint256', name: 'nonce' },
  { type: 'address', name: 'erc20Token' },
  { type: 'uint256', name: 'erc20TokenAmount' },
  { type: 'Fee[]', name: 'fees' },
  { type: 'address', name: 'erc721Token' },
  { type: 'uint256', name: 'erc721TokenId' },
  { type: 'Property[]', name: 'erc721TokenProperties' },
];

export const EIP1155_DOMAIN_PARAMETERS = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];

export const ERC1155ORDER_STRUCT_NAME = 'ERC1155Order';
export const ERC1155ORDER_STRUCT_ABI = [
  { type: 'uint8', name: 'direction' },
  { type: 'address', name: 'maker' },
  { type: 'address', name: 'taker' },
  { type: 'uint256', name: 'expiry' },
  { type: 'uint256', name: 'nonce' },
  { type: 'address', name: 'erc20Token' },
  { type: 'uint256', name: 'erc20TokenAmount' },
  { type: 'Fee[]', name: 'fees' },
  { type: 'address', name: 'erc1155Token' },
  { type: 'uint256', name: 'erc1155TokenId' },
  { type: 'Property[]', name: 'erc1155TokenProperties' },
  { type: 'uint128', name: 'erc1155TokenAmount' },
];

export const FEE_ABI = [
  { type: 'address', name: 'recipient' },
  { type: 'uint256', name: 'amount' },
  { type: 'bytes', name: 'feeData' },
];

export const PROPERTY_ABI = [
  { type: 'address', name: 'propertyValidator' },
  { type: 'bytes', name: 'propertyData' },
];

export const ETH_ADDRESS_AS_ERC20 =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const NATIVE_TOKEN_ADDRESS_AS_ERC20 =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const INFINITE_EXPIRATION_TIMESTAMP_SEC = BigNumber.from(2524604400);

export const ONE_TWENTY_EIGHT_BIT_LENGTH = 39;

export const RESERVED_APP_ID_PREFIX = '1001';
export const RESERVED_APP_ID_PREFIX_DIGITS = RESERVED_APP_ID_PREFIX.length;

export const TWO_FIFTY_SIX_BIT_LENGTH = 78;

export const ZERO_EX_CONTRACT_ADDRESS =  "0x398BAa6FFc99126671Ab6be565856105a6118A40";

export const AVAX_CHAIN_ID = 43113;