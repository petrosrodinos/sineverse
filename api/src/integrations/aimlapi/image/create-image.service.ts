import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreateImageAdapter } from './create-image.adapter';
import { CreateImageSchema, ImageGenerationResponse } from '../core/schemas';

@Injectable()
export class CreateImageService {
  private readonly logger = new Logger(CreateImageService.name);

  constructor(private readonly createImageAdapter: CreateImageAdapter) {}

  async execute(input: unknown): Promise<ImageGenerationResponse> {
    const validation = await CreateImageSchema.safeParseAsync(input);

    if (!validation.success) {
      const errorTrace = validation.error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join('; ');

      this.logger.error(`Payload validation failed: ${errorTrace}`);

      throw new HttpException(
        {
          error: 'PayloadValidationFailed',
          message: errorTrace,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const request = validation.data;

    return this.createImageAdapter.createImage(request);
  }
}
