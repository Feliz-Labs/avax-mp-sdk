export enum OperationComparisonEnum {
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
  LESS_THAN = "LESS_THAN",
  LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
}

export class NumberInputArg {
  operation: OperationComparisonEnum;
  value: number;
}

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OrderConfig = {
  field_name: Scalars['String'];
  sort_order: SortOrderEnum;
};

export enum MarketplaceActionEnum {
  Bid = 'BID',
  Cancelbid = 'CANCELBID',
  Cancelcollectionbid = 'CANCELCOLLECTIONBID',
  Collectionbid = 'COLLECTIONBID',
  Delisting = 'DELISTING',
  Failed = 'FAILED',
  Fractionalized = 'FRACTIONALIZED',
  Listing = 'LISTING',
  Mint = 'MINT',
  Other = 'OTHER',
  PoolDeposit = 'POOL_DEPOSIT',
  Rawbid = 'RAWBID',
  Rawcancelbid = 'RAWCANCELBID',
  Redeemed = 'REDEEMED',
  Transaction = 'TRANSACTION',
  Transfer = 'TRANSFER',
  Unknown = 'UNKNOWN',
  Updatebid = 'UPDATEBID',
  Updatelisting = 'UPDATELISTING',
  Upgrade = 'UPGRADE'
}

export enum NonMarketplaceActionEnum {
  Burn = 'BURN',
  DepositStake = 'DEPOSIT_STAKE',
  Mint = 'MINT',
  Other = 'OTHER',
  Stake = 'STAKE',
  Transfer = 'TRANSFER',
  Unstake = 'UNSTAKE',
  UpdateMetadata = 'UPDATE_METADATA',
  WithdrawStake = 'WITHDRAW_STAKE'
}

export enum CollectionBidActionEnum {
  Cancelcollectionbid = 'CANCELCOLLECTIONBID',
  Collectionbid = 'COLLECTIONBID',
  Transaction = 'TRANSACTION'
}

export enum CollectionIdentifierTypeEnum {
  FffLoan = 'FFF_LOAN',
  FirstCreator = 'FIRST_CREATOR',
  FractionalCurrency = 'FRACTIONAL_CURRENCY',
  HsLoan = 'HS_LOAN',
  MasterEdition = 'MASTER_EDITION',
  MccId = 'MCC_ID',
  MerkleTree = 'MERKLE_TREE',
  RainLoan = 'RAIN_LOAN',
  SharkLoan = 'SHARK_LOAN',
  UgsLoan = 'UGS_LOAN',
  YawwwLoan = 'YAWWW_LOAN'
}

export type PaginationConfig = {
  page_number?: InputMaybe<Scalars['Float']>;
  page_size?: InputMaybe<Scalars['Float']>;
};

export type PaginationInfoResponseType = {
  __typename?: 'PaginationInfoResponseType';
  current_page_number: Scalars['Float'];
  current_page_size: Scalars['Float'];
  has_next_page: Scalars['Boolean'];
  total_page_number?: Maybe<Scalars['Float']>;
};


export enum ProtocolEnum {
  Aptos = 'APTOS',
  Avax = 'AVAX',
  Btc = 'BTC',
  Cardano = 'CARDANO',
  Ethereum = 'ETHEREUM',
  Solana = 'SOLANA',
  Sui = 'SUI'
}

export type Project = {
  __typename?: 'Project';
  allow_list_id?: Maybe<Scalars['String']>;
  banner_url?: Maybe<Scalars['String']>;
  contract_address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  discord?: Maybe<Scalars['String']>;
  display_id?: Maybe<Scalars['String']>;
  display_name: Scalars['String'];
  img_url?: Maybe<Scalars['String']>;
  is_launchpad?: Maybe<Scalars['Boolean']>;
  is_trading_disabled?: Maybe<Scalars['Boolean']>;
  is_trading_enabled?: Maybe<Scalars['Boolean']>;
  is_verified?: Maybe<Scalars['Boolean']>;
  launch_date?: Maybe<Scalars['DateTime']>;
  launch_timestamp?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  minimum_royalty?: Maybe<Scalars['Float']>;
  project_id: Scalars['String'];
  project_slug?: Maybe<Scalars['String']>;
  protocol?: Maybe<ProtocolEnum>;
  rarities?: Maybe<Scalars['JSON']>;
  rewards_earning?: Maybe<Scalars['Boolean']>;
  royalty?: Maybe<Scalars['Float']>;
  short_description?: Maybe<Scalars['String']>;
  supply?: Maybe<Scalars['Float']>;
  token_type?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  website?: Maybe<Scalars['String']>;
};


export type ProjectStat = {
  __typename?: 'ProjectStat';
  average_price?: Maybe<Scalars['Float']>;
  average_price_1day_change?: Maybe<Scalars['Float']>;
  average_price_7day_change?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['DateTime']>;
  discord_members?: Maybe<Scalars['Float']>;
  feeless_floor_price?: Maybe<Scalars['Float']>;
  floor_price?: Maybe<Scalars['Float']>;
  floor_price_1day_change?: Maybe<Scalars['Float']>;
  market_cap?: Maybe<Scalars['Float']>;
  max_price?: Maybe<Scalars['Float']>;
  num_of_token_holders?: Maybe<Scalars['Float']>;
  num_of_token_listed?: Maybe<Scalars['Float']>;
  percentage_of_token_listed?: Maybe<Scalars['Float']>;
  project?: Maybe<Project>;
  project_id: Scalars['String'];
  rank?: Maybe<Scalars['Float']>;
  raw_market_cap?: Maybe<Scalars['Float']>;
  raw_volume?: Maybe<Scalars['Float']>;
  raw_volume_1day?: Maybe<Scalars['Float']>;
  raw_volume_1day_change?: Maybe<Scalars['Float']>;
  raw_volume_1hr?: Maybe<Scalars['Float']>;
  raw_volume_7day?: Maybe<Scalars['Float']>;
  raw_volume_7day_change?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
  twitter_followers?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  volume?: Maybe<Scalars['Float']>;
  volume_1day?: Maybe<Scalars['Float']>;
  volume_1day_change?: Maybe<Scalars['Float']>;
  volume_1hr?: Maybe<Scalars['Float']>;
  volume_1m?: Maybe<Scalars['Float']>;
  volume_5m?: Maybe<Scalars['Float']>;
  volume_7day?: Maybe<Scalars['Float']>;
  volume_7day_change?: Maybe<Scalars['Float']>;
  volume_15m?: Maybe<Scalars['Float']>;
  volume_30m?: Maybe<Scalars['Float']>;
};

export type BidSnapshot = {
  __typename?: 'BidSnapshot';
  amount?: Maybe<Scalars['Float']>;
  block_number?: Maybe<Scalars['Float']>;
  block_timestamp?: Maybe<Scalars['Float']>;
  buyer_address?: Maybe<Scalars['String']>;
  buyer_referral_address?: Maybe<Scalars['String']>;
  buyer_referral_fee?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  currency_price?: Maybe<Scalars['Float']>;
  decimal?: Maybe<Scalars['Float']>;
  display_price?: Maybe<Scalars['Float']>;
  escrow_address?: Maybe<Scalars['String']>;
  expiry_time?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Float']>;
  program_fee_address?: Maybe<Scalars['String']>;
  program_id?: Maybe<Scalars['String']>;
  program_instance_id?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  token_address?: Maybe<Scalars['String']>;
  tx_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type LastSaleSnapshot = {
  __typename?: 'LastSaleSnapshot';
  amount?: Maybe<Scalars['Float']>;
  block_number?: Maybe<Scalars['Float']>;
  block_timestamp?: Maybe<Scalars['Float']>;
  buyer_address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  currency_price?: Maybe<Scalars['Float']>;
  decimal?: Maybe<Scalars['Float']>;
  display_price?: Maybe<Scalars['Float']>;
  escrow_address?: Maybe<Scalars['String']>;
  expiry_time?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  listing_type?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Float']>;
  program_fee_address?: Maybe<Scalars['String']>;
  program_id?: Maybe<Scalars['String']>;
  program_instance_id?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  seller_address?: Maybe<Scalars['String']>;
  seller_referral_address?: Maybe<Scalars['String']>;
  seller_referral_fee?: Maybe<Scalars['Float']>;
  token_address?: Maybe<Scalars['String']>;
  tx_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type ListingSnapshot = {
  __typename?: 'ListingSnapshot';
  amount?: Maybe<Scalars['Float']>;
  block_number?: Maybe<Scalars['Float']>;
  block_timestamp?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  currency_price?: Maybe<Scalars['Float']>;
  decimal?: Maybe<Scalars['Float']>;
  display_price?: Maybe<Scalars['Float']>;
  escrow_address?: Maybe<Scalars['String']>;
  expiry_time?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  listing_type?: Maybe<Scalars['String']>;
  marketplace_config?: Maybe<MarketplaceConfig>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Float']>;
  program_fee_address?: Maybe<Scalars['String']>;
  program_id?: Maybe<Scalars['String']>;
  program_instance_id?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['String']>;
  seller_address?: Maybe<Scalars['String']>;
  seller_referral_address?: Maybe<Scalars['String']>;
  seller_referral_fee?: Maybe<Scalars['Float']>;
  token_address?: Maybe<Scalars['String']>;
  tx_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type MarketplaceConfig = {
  __typename?: 'MarketplaceConfig';
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  img_url?: Maybe<Scalars['String']>;
  is_bidding_enabled?: Maybe<Scalars['Boolean']>;
  is_bulk_buy_enabled?: Maybe<Scalars['Boolean']>;
  is_buying_enabled?: Maybe<Scalars['Boolean']>;
  is_delisting_enabled?: Maybe<Scalars['Boolean']>;
  is_listing_enabled?: Maybe<Scalars['Boolean']>;
  is_sweeping_enabled?: Maybe<Scalars['Boolean']>;
  item_path?: Maybe<Scalars['String']>;
  program_id?: Maybe<Scalars['String']>;
  program_instance_id?: Maybe<Scalars['String']>;
  protocol?: Maybe<ProtocolEnum>;
  should_redirect?: Maybe<Scalars['Boolean']>;
  website?: Maybe<Scalars['String']>;
};

export type RaritySnapshot = {
  __typename?: 'RaritySnapshot';
  hyperspace?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['String']>;
  token_address?: Maybe<Scalars['String']>;
};

export type MarketplaceState = {
  __typename?: 'MarketplaceState';
  amount?: Maybe<Scalars['Float']>;
  block_index?: Maybe<Scalars['Float']>;
  block_number?: Maybe<Scalars['Float']>;
  block_timestamp?: Maybe<Scalars['Float']>;
  buyer_address?: Maybe<Scalars['String']>;
  buyer_referral_address?: Maybe<Scalars['String']>;
  buyer_referral_fee?: Maybe<Scalars['Float']>;
  contract_address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  currency_price?: Maybe<Scalars['Float']>;
  decimal?: Maybe<Scalars['Float']>;
  display_price?: Maybe<Scalars['Float']>;
  escrow_address?: Maybe<Scalars['String']>;
  expiry_time?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  instruction_index?: Maybe<Scalars['Float']>;
  listing_type?: Maybe<Scalars['String']>;
  marketplace_fee_address?: Maybe<Scalars['String']>;
  marketplace_instance_id?: Maybe<Scalars['String']>;
  marketplace_program_id?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Float']>;
  seller_address?: Maybe<Scalars['String']>;
  seller_referral_address?: Maybe<Scalars['String']>;
  seller_referral_fee?: Maybe<Scalars['Float']>;
  sub_instruction_index?: Maybe<Scalars['Float']>;
  token_address?: Maybe<Scalars['String']>;
  trade_state?: Maybe<Scalars['String']>;
  tx_id?: Maybe<Scalars['String']>;
  type?: Maybe<MarketplaceActionEnum>;
  updated_at?: Maybe<Scalars['DateTime']>;
};


export type NonMarketplaceActions = {
  __typename?: 'NonMarketplaceActions';
  amount?: Maybe<Scalars['Float']>;
  block_number?: Maybe<Scalars['Float']>;
  block_timestamp?: Maybe<Scalars['Float']>;
  contract_address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  currency_price?: Maybe<Scalars['Float']>;
  decimal?: Maybe<Scalars['Float']>;
  destination_address?: Maybe<Scalars['String']>;
  destination_token_account?: Maybe<Scalars['String']>;
  instruction_index?: Maybe<Scalars['Float']>;
  metadata?: Maybe<Scalars['JSON']>;
  new_authority?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  program_id?: Maybe<Scalars['String']>;
  source_address?: Maybe<Scalars['String']>;
  source_token_account?: Maybe<Scalars['String']>;
  sub_instruction_index?: Maybe<Scalars['Float']>;
  token_address?: Maybe<Scalars['String']>;
  token_name?: Maybe<Scalars['String']>;
  tx_id?: Maybe<Scalars['String']>;
  type?: Maybe<NonMarketplaceActionEnum>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type MarketplaceSnapshotResponse = {
  __typename?: 'MarketplaceSnapshotResponse';
  animation_url?: Maybe<Scalars['String']>;
  attributes?: Maybe<Scalars['JSON']>;
  bid_snapshot?: Maybe<BidSnapshot>;
  created_at?: Maybe<Scalars['DateTime']>;
  creator_royalty?: Maybe<Scalars['Float']>;
  feeless_floor_price?: Maybe<Scalars['Float']>;
  floor_price?: Maybe<Scalars['Float']>;
  floor_price_1day_change?: Maybe<Scalars['Float']>;
  is_project_verified?: Maybe<Scalars['Boolean']>;
  last_sale_snapshot?: Maybe<LastSaleSnapshot>;
  listing_snapshot?: Maybe<ListingSnapshot>;
  marketplace_state?: Maybe<MarketplaceState>;
  metadata_img?: Maybe<Scalars['String']>;
  metadata_uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nft_standard?: Maybe<Scalars['String']>;
  non_marketplace_state?: Maybe<NonMarketplaceActions>;
  owner?: Maybe<Scalars['String']>;
  project_description?: Maybe<Scalars['String']>;
  project_id: Scalars['String'];
  project_image?: Maybe<Scalars['String']>;
  project_metadata?: Maybe<Scalars['JSON']>;
  project_name?: Maybe<Scalars['String']>;
  project_protocol?: Maybe<ProtocolEnum>;
  project_slug?: Maybe<Scalars['String']>;
  project_supply?: Maybe<Scalars['Float']>;
  rarity_snapshot?: Maybe<RaritySnapshot>;
  supply?: Maybe<Scalars['Float']>;
  token_address: Scalars['String'];
  token_type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};



export type CollectionBidState = {
  __typename?: 'CollectionBidState';
  amount?: Maybe<Scalars['Float']>;
  block_number?: Maybe<Scalars['Float']>;
  block_timestamp?: Maybe<Scalars['Float']>;
  buyer_address?: Maybe<Scalars['String']>;
  buyer_referral_address?: Maybe<Scalars['String']>;
  buyer_referral_fee?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  currency_price?: Maybe<Scalars['Float']>;
  decimal?: Maybe<Scalars['Float']>;
  display_price?: Maybe<Scalars['Float']>;
  expiration?: Maybe<Scalars['Float']>;
  expiry_time?: Maybe<Scalars['Float']>;
  fee?: Maybe<Scalars['Float']>;
  fee_address?: Maybe<Scalars['String']>;
  identifier_index?: Maybe<Scalars['Float']>;
  identifier_key?: Maybe<Scalars['String']>;
  identifier_type: CollectionIdentifierTypeEnum;
  instruction_index?: Maybe<Scalars['Float']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Float']>;
  program_id?: Maybe<Scalars['String']>;
  program_instance_id?: Maybe<Scalars['String']>;
  protocol?: Maybe<ProtocolEnum>;
  seller_address?: Maybe<Scalars['String']>;
  seller_referral_address?: Maybe<Scalars['String']>;
  seller_referral_fee?: Maybe<Scalars['Float']>;
  trade_state?: Maybe<Scalars['String']>;
  tx_id?: Maybe<Scalars['String']>;
  type?: Maybe<CollectionBidActionEnum>;
  updated_at?: Maybe<Scalars['DateTime']>;
};