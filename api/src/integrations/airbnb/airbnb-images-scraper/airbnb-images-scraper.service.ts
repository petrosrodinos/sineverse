import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  AIRBNB_IMAGES_SCRAPER_DATASET_SYNC_PATH,
  AIRBNB_IMAGES_SCRAPER_REQUEST_TIMEOUT_MS,
  APIFY_API_BASE_URL,
} from './airbnb-images-scraper.config';
import {
  AirbnbImagesScrapeResult,
  AirbnbImagesScraperProxyConfiguration,
} from './airbnb-images-scraper.interfaces';
import {
  assertApifyToken,
  buildAirbnbImagesScraperInput,
  parseAirbnbImagesDatasetItems,
} from './airbnb-images-scraper.utils';

@Injectable()
export class AirbnbImagesScraperService {
  private readonly logger = new Logger(AirbnbImagesScraperService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async scrapeListingImages(
    listingUrl: string,
    proxyConfiguration?: AirbnbImagesScraperProxyConfiguration,
  ): Promise<AirbnbImagesScrapeResult> {
    return this.scrapeListingsImages([listingUrl], proxyConfiguration);
  }

  async scrapeListingsImages(
    listingUrls: string[],
    proxyConfiguration?: AirbnbImagesScraperProxyConfiguration,
  ): Promise<AirbnbImagesScrapeResult> {
    const token = this.getApifyToken();
    const input = buildAirbnbImagesScraperInput(listingUrls, proxyConfiguration);
    const endpointUrl = this.buildEndpointUrl(token);

    try {
      const response = await firstValueFrom(
        this.httpService.post<unknown>(endpointUrl, input, {
          timeout: AIRBNB_IMAGES_SCRAPER_REQUEST_TIMEOUT_MS,
        }),
      );

      const items = parseAirbnbImagesDatasetItems(response.data);

      return {
        items,
        total: items.length,
      };
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);

      this.logger.error(`scrapeListingsImages failed: ${details}`);

      throw new InternalServerErrorException(
        'Failed to fetch Airbnb listing images',
      );
    }
  }

  private getApifyToken(): string {
    const token = this.configService.get<string>('APIFY_TOKEN');

    try {
      return assertApifyToken(token);
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);

      this.logger.error(`getApifyToken failed: ${details}`);

      throw new InternalServerErrorException('APIFY_TOKEN is not configured');
    }
  }

  private buildEndpointUrl(token: string): string {
    const url = new URL(
      `${APIFY_API_BASE_URL}${AIRBNB_IMAGES_SCRAPER_DATASET_SYNC_PATH}`,
    );

    url.searchParams.set('token', token);

    return url.toString();
  }
}
