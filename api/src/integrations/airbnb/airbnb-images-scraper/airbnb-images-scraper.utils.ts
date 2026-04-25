import {
  AIRBNB_IMAGES_SCRAPER_DEFAULT_PROXY_CONFIGURATION,
} from './airbnb-images-scraper.config';
import {
  AirbnbImagesScraperInput,
  AirbnbImagesScraperProxyConfiguration,
  AirbnbListingImagesDatasetItem,
} from './airbnb-images-scraper.interfaces';

export function normalizeAirbnbListingUrls(urls: string[]): string[] {
  const normalizedUrls = urls
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
    .map((url) => new URL(url).toString());

  const uniqueUrls = Array.from(new Set(normalizedUrls));

  if (uniqueUrls.length === 0) {
    throw new Error('At least one Airbnb listing URL is required');
  }

  return uniqueUrls;
}

export function buildAirbnbImagesScraperInput(
  urls: string[],
  proxyConfiguration?: AirbnbImagesScraperProxyConfiguration,
): AirbnbImagesScraperInput {
  const normalizedUrls = normalizeAirbnbListingUrls(urls);

  return {
    urls: normalizedUrls,
    proxyConfiguration: proxyConfiguration ?? {
      ...AIRBNB_IMAGES_SCRAPER_DEFAULT_PROXY_CONFIGURATION,
      apifyProxyGroups: [
        ...AIRBNB_IMAGES_SCRAPER_DEFAULT_PROXY_CONFIGURATION.apifyProxyGroups,
      ],
    },
  };
}

export function assertApifyToken(token: string | undefined): string {
  if (!token || token.trim().length === 0) {
    throw new Error('APIFY_TOKEN is missing');
  }

  return token;
}

export function parseAirbnbImagesDatasetItems(
  payload: unknown,
): AirbnbListingImagesDatasetItem[] {
  if (!Array.isArray(payload)) {
    throw new Error('Invalid Airbnb scraper response format');
  }

  return payload
    .filter((entry) => isRecord(entry))
    .map((entry) => entry as AirbnbListingImagesDatasetItem);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
