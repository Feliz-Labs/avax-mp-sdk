import { JsonRpcBatchProvider } from "@ethersproject/providers";
import {
  approveErc721,
  approveWavax,
  getERC721ApprovalStatus,
  getWavaxApprovalStatus,
  getWavaxBalance,
  handleSignAndExecute,
  handleSignTransaction,
} from "./utils/helpers";
import { ethers } from "ethers";
import axios from "axios";

export class MPSDK {
  wallet: ethers.Wallet;
  provider: JsonRpcBatchProvider;
  apiKey: string;

  public constructor(apiKey: string, wallet: ethers.Wallet, rpc: string) {
    this.provider = new JsonRpcBatchProvider(rpc);
    this.wallet = wallet.connect(this.provider);
    this.apiKey = apiKey;
  }

  public async validateSignature(orderObject: any) {
    const data = JSON.stringify({
      order: orderObject,
    });

    const config = {
      method: "post",
      url: "https://avax.api.hyperspace.xyz/rest/validate-signature",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.apiKey,
      },
      data: data,
    };

    return await axios.request(config);
  }

  /**
   * Creating a collection bid
   * @param contractAddress
   * @param priceInNavax
   * @returns bool for success or failure
   */
  public async createCollectionBid(
    contractAddress: string,
    priceInNavax: number
  ) {
    const bidder = this.wallet.address;

    const wavaxBalance = await getWavaxBalance(this.provider, bidder);

    const approved = await getWavaxApprovalStatus(
      this.provider,
      bidder,
      wavaxBalance
    );

    if (!approved) {
      console.log(`Approving marketplace to trade wavax`)
      const approveNFTReceipt = await approveWavax(this.wallet);
      console.log(`Approve wavax Transaction Hash: ${approveNFTReceipt.transactionHash}`);
    }

    const data = JSON.stringify({
      condition: {
        price: priceInNavax,
        buyer_address: bidder,
        metadata: {
          contractAddress,
          price: "" + priceInNavax,
        },
      },
    });

    const requestConfig = {
      method: "post",
      url: "https://avax.api.hyperspace.xyz/rest/create-collection-bid-tx",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.apiKey,
      },
      data: data,
    };
    const res = await axios.request(requestConfig);

    if (res.data?.length && res.data[0].metadata) {
      const orderData = res.data[0].metadata;
      const { transactionBlockBytes } = await handleSignTransaction(
        orderData,
        this.wallet
      );

      const orderObject = JSON.parse(transactionBlockBytes);

      const isValidRes = await this.validateSignature(orderObject);

      return isValidRes;
    }
  }

  /**
   * List NFT for sale off chain
   * @param contractAddress
   * @param tokenId
   * @param price
   * @returns boolean for success or failure
   */
  public async listNFT(contractAddress: string, tokenId: string, price: number) {
    const seller = this.wallet.address;
    const tokenAddress = `${contractAddress}_${tokenId}`;

    const approved = await getERC721ApprovalStatus(
      this.provider,
      seller,
      contractAddress
    );

    if (!approved) {
      console.log(`Approving marketplace to trade ${contractAddress}`)
      const approveNFTReceipt = await approveErc721(this.wallet, contractAddress);
      console.log(`Approve ERC721 Transaction Hash: ${approveNFTReceipt.transactionHash}`);
    }

    const data = JSON.stringify({
      condition: {
        list_tx_args: [
          {
            token_address: tokenAddress,
            seller_address: seller as string,
            metadata: {
              contractAddress,
              tokenId,
              price: "" + price,
            },
          },
        ],
      },
    });

    const requestConfig = {
      method: "post",
      url: "https://avax.api.hyperspace.xyz/rest/create-list-tx",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.apiKey,
      },
      data: data,
    };
    const res = await axios.request(requestConfig);

    if (res.data?.length && res.data[0].metadata) {
      const orderData = res.data[0].metadata;

      const { transactionBlockBytes } = await handleSignTransaction(
        orderData,
        this.wallet
      );

      const orderObject = JSON.parse(transactionBlockBytes);

      // Submit listing to rest endpoint to be indexed and shown in the UI
      const isValidRes = await this.validateSignature(orderObject);

      return isValidRes;
    }
  }

  /**
   * Buys an NFT, executes on chain
   * @param contractAddress
   * @param tokenId
   * @param price
   * @param metadata field returned from read apis for listings
   * @returns transaction hash for purchase transaction or error
   */
  public async buyNft(
    contractAddress: string,
    tokenId: string,
    price: number,
    // Metadata field returned from read apis for listings
    metadata: any
  ) {
    const tokenAddress = `${contractAddress}_${tokenId}`;
    try {
      const buyer = this.wallet.address;

      const buyTxArgs = [
        {
          buyer_address: buyer as string,
          token_address: tokenAddress,
          price,
          metadata,
        },
      ];

      const data = JSON.stringify({
        condition: {
          buy_tx_args: buyTxArgs,
        },
      });

      const requestConfig = {
        method: "post",
        url: "https://avax.api.hyperspace.xyz/rest/create-buy-tx",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.apiKey,
        },
        data: data,
      };
      const res = await axios.request(requestConfig);

      const totalAmountToPay = [
        BigInt(metadata.event_log.erc20TokenAmount),
        ...metadata.event_log.fees.map((fee: any) => BigInt(fee.amount)),
      ].reduce((a, b) => a + b);

      if (res.data?.length && res.data[0].byte_string) {
        const encodedTransaction = res.data[0].byte_string;

        const txReceipt = await handleSignAndExecute(
          {
            data: encodedTransaction,
            value: totalAmountToPay,
          },
          this.wallet
        );

        if (txReceipt.status == 1 && txReceipt.transactionHash) {
          return {
            digest: txReceipt.transactionHash,
            errors: null,
          };
        }

        return {
          digest: null,
          errors: "Failed to sign and execute purchase transaction",
        };
      } else {
        return {
          digest: null,
          tokensPurchased: [],
          errors: "Failed to create buy txn",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        digest: null,
        errors: error.message,
      };
    }
  }

  /**
   * Accepts a collection bid with a NFT held by the wallet on chain
   * @param contractAddress
   * @param tokenId
   * @param price
   * @param metadata field returned from read apis for collection bids
   * @returns transaction hash for sell transaction or error
   */
  public async acceptCollectionBid(
    contractAddress: string,
    tokenId: string,
    price: number,
    // Metadata field returned from read apis for collection bids
    metadata: any
  ) {
    const seller = this.wallet.address;
    try {
      const approved = await getERC721ApprovalStatus(
        this.provider,
        seller,
        contractAddress
      );

      if (!approved) {
        console.log(`Approving marketplace to trade ${contractAddress}`)
        const approveNFTReceipt = await approveErc721(this.wallet, contractAddress);
        console.log(`Approve ERC721 Transaction Hash: ${approveNFTReceipt.transactionHash}`);
      }

      const data = JSON.stringify({
        condition: {
          token_address: `${contractAddress}_${tokenId}`,
          price,
          seller_address: seller,
          metadata,
        },
      });

      const requestConfig = {
        method: "post",
        url: "https://avax.api.hyperspace.xyz/rest/create-accept-collection-bid-tx",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.apiKey,
        },
        data: data,
      };
      const res = await axios.request(requestConfig);

      if (res.data?.length && res.data[0].byte_string) {
        const encodedTransaction = res.data[0].byte_string;

        const txReceipt = await handleSignAndExecute(
          {
            data: encodedTransaction,
          },
          this.wallet
        );

        if (txReceipt.status == 1 && txReceipt.transactionHash) {
          return {
            digest: txReceipt.transactionHash,
            errors: null,
          };
        }

        return {
          digest: null,
          errors:
            "Failed to sign and execute accept collection bid transaction",
        };
      } else {
        return {
          digest: null,
          tokensPurchased: [],
          errors: "Failed to create accept collection bid txn",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        digest: null,
        errors: error.message,
      };
    }
  }

  /**
   * Delists a NFT, executes on chain
   * @param contractAddress
   * @param tokenId
   * @param price
   * @param metadata field returned from read apis for listings
   * @returns transaction hash for delist transaction or error
   */
  public async delistNFT(contractAddress: string, tokenId: string, price: number, metadata: any) {
    const seller = this.wallet.address;
    const tokenAddress = `${contractAddress}_${tokenId}`;
    try {
      const data = JSON.stringify({
        condition: {
          delist_tx_args: [
            {
              seller_address: seller,
              token_address: tokenAddress,
              price,
              metadata,
            },
          ],
        },
      });

      const requestConfig = {
        method: "post",
        url: "https://avax.api.hyperspace.xyz/rest/create-delist-tx",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.apiKey,
        },
        data: data,
      };
      const res = await axios.request(requestConfig);

      if (res.data?.length && res.data[0].byte_string) {
        const encodedTransaction = res.data[0].byte_string;
        const txHash = await handleSignAndExecute(
          {
            data: encodedTransaction,
          },
          this.wallet
        );

        if (txHash.transactionHash) {
          return {
            digest: txHash.transactionHash,
            errors: null,
          };
        }

        return {
          digest: null,
          errors: "Failed to sign and execute delist transaction",
        };
      } else {
        return {
          digest: null,
          errors: "Failed to create delist txn",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        digest: null,
        errors: error.message,
      };
    }
  }

  /**
   * Cancels a collection bid, executes on chain
   * @param price
   * @param metadata
   * @returns transaction hash for cancel collection bid transaction or error
   */
  public async cancelCollectionBid(price: number, metadata: any) {
    const bidder = this.wallet.address;
    try {
      const data = JSON.stringify({
        condition: {
          buyer_address: bidder,
          price,
          metadata,
        },
      });

      const requestConfig = {
        method: "post",
        url: "https://avax.api.hyperspace.xyz/rest/create-cancel-collection-bid-tx",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.apiKey,
        },
        data: data,
      };
      const res = await axios.request(requestConfig);

      if (res.data?.length && res.data[0].byte_string) {
        const encodedTransaction = res.data[0].byte_string;
        const txHash = await handleSignAndExecute(
          {
            data: encodedTransaction,
          },
          this.wallet
        );

        if (txHash.transactionHash) {
          return {
            digest: txHash.transactionHash,
            errors: null,
          };
        }

        return {
          digest: null,
          errors:
            "Failed to sign and execute cancel collection bid transaction",
        };
      } else {
        return {
          digest: null,
          errors: "Failed to create cancel collection bid txn",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        digest: null,
        errors: error.message,
      };
    }
  }
}