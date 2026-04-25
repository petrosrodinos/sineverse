export type AirbnbImagesScraperProxyConfiguration = {
  useApifyProxy?: boolean;
  apifyProxyGroups?: string[];
  apifyProxyCountry?: string;
};

export type AirbnbImagesScraperInput = {
  urls: string[];
  proxyConfiguration?: AirbnbImagesScraperProxyConfiguration;
};

export type AirbnbImageAsset = {
  url: string;
  caption?: string;
};

export type AirbnbListingImagesDatasetItem = {
  listingUrl?: string;
  listingId?: string;
  images?: AirbnbImageAsset[];
  [key: string]: unknown;
};

export type AirbnbImagesScrapeResult = {
  items: AirbnbListingImagesDatasetItem[];
  total: number;
};
