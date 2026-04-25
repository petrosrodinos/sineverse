import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AirbnbImagesScraperService } from './airbnb-images-scraper.service';

@Module({
  imports: [HttpModule],
  providers: [AirbnbImagesScraperService],
  exports: [AirbnbImagesScraperService],
})
export class AirbnbImagesScraperModule {}
