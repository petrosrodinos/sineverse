import { resolveApiBaseUrl } from "./api-url.utils";

const APP_NAME = "Sineverse";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const API_URL = resolveApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);

const SESSION_EXPIRATION = 30 * 24 * 60 * 60;

export const environments = {
  APP_NAME,
  APP_URL,
  API_URL,
  SESSION_EXPIRATION,
};
