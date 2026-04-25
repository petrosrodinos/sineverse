export const APIFY_API_BASE_URL = 'https://api.apify.com/v2';

export const AIRBNB_IMAGES_SCRAPER_DATASET_SYNC_PATH =
  '/acts/simpleapi~airbnb-images-scraper/run-sync-get-dataset-items';

export const AIRBNB_IMAGES_SCRAPER_REQUEST_TIMEOUT_MS = 120000;

export const AIRBNB_IMAGES_SCRAPER_DEFAULT_PROXY_CONFIGURATION = {
  useApifyProxy: true,
  apifyProxyGroups: ['RESIDENTIAL'],
} as const;
