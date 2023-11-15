import axios from "axios";
import { OrderConfig, PaginationConfig } from "./types";
const API_KEY = "";

/**
 * Get user owned NFTs
 * @param walletAddress
 * @param collection
 * @param pagination
 * @returns MarketplaceSnapshotResponse[]
 */
export const getUserOwnedNFTs = async ({
  walletAddress,
  collection,
  pagination,
}: {
  walletAddress: string;
  collection?: string;
  pagination?: PaginationConfig;
}) => {
  const condition = collection
    ? {
        condition: {
          owner: walletAddress,
          project_ids: [
            {
              project_id: collection,
            },
          ],
        },
        pagination_info: pagination,
      }
    : {
        condition: {
          owner: walletAddress,
        },
        pagination_info: pagination,
      };
  const data = JSON.stringify(condition);

  const config = {
    method: "post",
    url: "https://avax.api.hyperspace.xyz/rest/get-marketplace-snapshots",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data,
  };

  return await axios.request(config);
};

// Get collection bids for a collection
/**
 * Get collection bids for a collection
 * @param collection
 * @param pagination
 * @returns CollectionBidState[]
 */
export const getCollectionBids = async ({
  collection,
  pagination
}: {
  collection: string;
  pagination?: PaginationConfig;
}) => {
  const condition = {
    condition: {
      contract_address: collection
    },
    pagination_info: pagination,
  };

  const data = JSON.stringify(condition);

  const config = {
    method: "post",
    url: "https://avax.api.hyperspace.xyz/rest/get-collection-bids-for-project",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data,
  };

  return await axios.request(config);
};

/**
 * Get collection bids for a user
 * @param collection
 * @param walletAddress
 * @param pagination
 * @returns CollectionBidState[]
 */
export const getUserCollectionBids = async ({
  collection,
  walletAddress,
  pagination
}: {
  collection: string;
  walletAddress: string;
  pagination?: PaginationConfig;
}) => {
  const condition = {
    condition: {
      contract_address: collection,
      buyer_address: walletAddress
    },
    pagination_info: pagination,
  };

  const data = JSON.stringify(condition);

  const config = {
    method: "post",
    url: "https://avax.api.hyperspace.xyz/rest/get-collection-bids-for-project-and-user",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data,
  };

  return await axios.request(config);

};

/**
 * Get user listings
 * @param walletAddress
 * @param collection
 * @param pagination
 * @returns MarketplaceSnapshotResponse[]
 */
export const getUserListings = async ({
  walletAddress,
  collection,
  pagination
}: {
  walletAddress: string;
  collection?: string;
  pagination?: PaginationConfig;
}) => {
  const condition = {
    condition: {
      owner: walletAddress,
      project_ids: [
        {
          project_id: collection,
        },
      ],
      listing_type: "NORMAL",
    },
    pagination_info: pagination,
  };

  const data = JSON.stringify(condition);

  const config = {
    method: "post",
    url: "https://avax.api.hyperspace.xyz/rest/get-marketplace-snapshot",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data,
  };

  return await axios.request(config);

};

/**
 * Get Collection activity for a collection
 * @param collection
 * @param actionTypes
 * TRANSACTION, LISTING, DELISTING, BID, COLLECTIONBID, CANCELCOLLECTIONBID, CANCELBID
 * @param pagination
 * @returns MarketplaceSnapshotResponse[]
 */
export const getCollectionActivity = async ({
  collection,
  actionTypes,
  pagination,
}: {
  collection: string;
  actionTypes?: string[];
  pagination?: PaginationConfig;
}) => {
  const data = JSON.stringify({
    condition: {
      projects: [
        {
          project_id: collection,
        },
      ],
      action_types: actionTypes,
    },
    pagination_info: pagination,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://avax.api.hyperspace.xyz/rest/get-collection-activity",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data: data,
  };

  return await axios.request(config);
};

/**
 * Get Listings for a collection
 * @param collection
 * @param orderBy 
 * Allowed Columns to order by
    "listing_listing_type",
    "is_project_verified",
    "listing_block_timestamp",
    "listing_block_number",
    "listing_price",
    "listing_display_price",
    "rarity_hyperspace",
    "token_address",
    "token_id"
 * @param pagination
 * @returns MarketplaceSnapshotResponse[]
 */
export const getCollectionListings = async ({
  collection,
  orderBy,
  pagination,
}: {
  collection: string;
  orderBy?: OrderConfig[];
  pagination?: PaginationConfig;
}) => {
  const condition = {
    condition: {
      project_ids: [
        {
          project_id: collection,
        },
      ],
      listing_type: "NORMAL",
    },
    order_by: orderBy,
    pagination_info: pagination,
  };

  const data = JSON.stringify(condition);

  const config = {
    method: "post",
    url: "https://avax.api.hyperspace.xyz/rest/get-collection-view",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data,
  };

  return await axios.request(config);
};

/**
 * Get User activity for a wallet
 * @param walletAddress
 * @param actionTypes
 * TRANSACTION, LISTING, DELISTING, BID, COLLECTIONBID, CANCELCOLLECTIONBID, CANCELBID
 * @param pagination
 * @returns MarketplaceSnapshotResponse[]
 */
export const getUserActivity = async ({
  walletAddress,
  actionTypes,
  pagination,
}: {
  walletAddress: string;
  actionTypes?: string[];
  pagination?: PaginationConfig;
}) => {
  const data = JSON.stringify({
    condition: {
      user_address: walletAddress,
      action_types: actionTypes,
    },
    pagination_info: pagination,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://avax.api.hyperspace.xyz/rest/get-user-activity",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data: data,
  };

  return await axios.request(config);
};

/**
 * Get Collection Stats for a Collection
 * @param collection
 * @param orderBy 
 * Allowed Columns to order by
    "project_id",
    "market_cap",
    "volume_7day",
    "volume_1day",
    "floor_price",
    "floor_price_1day_change",
    "average_price",
    "average_price_1day_change",
    "volume_1day_change",
    "max_price",
    "num_of_token_holders",
    "num_of_token_listed",
    "percentage_of_token_listed",
    "created_at",
 * @param pagination
 * @returns ProjectStat[]
 */
export const getCollectionStats = async ({
  collection,
  orderBy,
  pagination,
}: {
  collection?: string;
  orderBy?: OrderConfig[];
  pagination?: PaginationConfig;
}) => {
  const condition = collection
    ? {
        condition: {
          project_ids: [collection],
        },
        order_by: orderBy,
        pagination_info: pagination,
      }
    : {
        order_by: orderBy,
        pagination_info: pagination,
      };
  const data = JSON.stringify(condition);

  const config = {
    method: "post",
    url: "https://avax.api.hyperspace.xyz/rest/get-project-stats",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    data,
  };

  return await axios.request(config);
};