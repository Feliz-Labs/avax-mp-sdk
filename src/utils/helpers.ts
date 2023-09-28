import { BigNumber, ethers } from "ethers";
import { AVAX_MP_CONTRACT_ADDRESS, MAX_APPROVAL, WAVAX_CONTRACT_ADDRESS } from "./constants";
import { wavax_abi } from "../abis/wavax_abi";
import { JsonRpcProvider } from "@ethersproject/providers";
import { prepareEncodedTransaction, signOrder } from "./signature";
import { erc721_abi } from "../abis/erc721_abi";

export const getWavaxBalance = async (
  provider: JsonRpcProvider,
  address: string
): Promise<string> => {
  const wavaxContract = new ethers.Contract(
    WAVAX_CONTRACT_ADDRESS,
    wavax_abi,
    provider
  );
  return wavaxContract.balanceOf(address);
};

export const getERC721ApprovalStatus = async (
  provider: JsonRpcProvider,
  address: string,
  contractAddress: string
): Promise<boolean> => {
  const erc721 = new ethers.Contract(contractAddress, erc721_abi, provider);
  const erc721ApprovalForAllPromise = await erc721.isApprovedForAll(
    address,
    AVAX_MP_CONTRACT_ADDRESS
  );

  return erc721ApprovalForAllPromise ?? false;
};

export const approveWavax = async (
  wallet: ethers.Wallet
) => {
  const wavaxContract = new ethers.Contract(
    WAVAX_CONTRACT_ADDRESS,
    wavax_abi,
    wallet
  );

  const approveTxn = await wavaxContract.approve(AVAX_MP_CONTRACT_ADDRESS, MAX_APPROVAL);
  const approveTxnReceipt = await approveTxn.wait();
  if (approveTxnReceipt.status === 0) {
    throw new Error("WAVAX approve transaction failed");
  }
  return approveTxnReceipt;
}

export const approveErc721 = async (
  wallet: ethers.Wallet,
  contractAddress: string
) => {
  const tokenContract = new ethers.Contract(
    contractAddress,
    erc721_abi,
    wallet
  );

  const approveTxn = await tokenContract.setApprovalForAll(AVAX_MP_CONTRACT_ADDRESS, true);
  const approveTxnReceipt = await approveTxn.wait();
  if (approveTxnReceipt.status === 0) {
    throw new Error("ERC721 approve transaction failed");
  }
  return approveTxnReceipt;
}

export const getWavaxApprovalStatus = async (
  provider: JsonRpcProvider,
  address: string,
  balance: string
): Promise<boolean> => {
  const wavaxContract = new ethers.Contract(
    WAVAX_CONTRACT_ADDRESS,
    wavax_abi,
    provider
  );
  const allowance = await wavaxContract.allowance(
    address,
    AVAX_MP_CONTRACT_ADDRESS
  );

  return allowance.gte(BigNumber.from(balance));
};

export const handleSignTransaction = async (
  txInput: any,
  wallet: ethers.Wallet
): Promise<{
  transactionBlockBytes: string;
  signature: string;
}> => {
  const signedOrder = await signOrder(txInput, wallet);
  return {
    transactionBlockBytes: JSON.stringify(signedOrder),
    signature: signedOrder.rawSignature,
  };
};

export const handleSignAndExecute = async (
  txInput: any,
  wallet: ethers.Wallet
): Promise<any> => {
  const transaction = await prepareEncodedTransaction(txInput, wallet);
  //@ts-ignore
  const txResponse = await wallet.sendTransaction(transaction);
  const txReceipt = await txResponse.wait();

  return txReceipt;
};
