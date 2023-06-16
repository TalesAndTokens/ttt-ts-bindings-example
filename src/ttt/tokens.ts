// See: https://docs.opensea.io/docs/metadata-standards#attributes
export type NftMetadataProperty = {
  trait_type: string;
  value: string | number;
  max_value?: number;
  display_type?: "date" | "boost_percentage" | "boost_number" | "number";
};

// See: https://docs.opensea.io/docs/metadata-standards#metadata-structure
export type NftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  attributes: NftMetadataProperty[];

  // not recommend
  image_data?: string;
};

export type BaseToken = NftMetadata & {
  tokenId: string;
  owner: string;
};
