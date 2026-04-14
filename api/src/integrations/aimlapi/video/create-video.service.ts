import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateVideoResponse,
  VideoStatusResponse,
  CreateVideoSchema,
} from '../core/schemas';
import { CreateVideoAdapter } from './create-video.adapter';

@Injectable()
export class CreateVideoService {
  private readonly logger = new Logger(CreateVideoService.name);

  constructor(private readonly createVideoAdapter: CreateVideoAdapter) {}

  async execute(input: unknown): Promise<CreateVideoResponse> {
    const validation = await CreateVideoSchema.safeParseAsync(input);

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

    return this.createVideoAdapter.createVideo(request);
  }

  /**
   * Retrieves status for a specific task.
   */
  async getStatus(taskId: string): Promise<VideoStatusResponse> {
    return this.createVideoAdapter.getVideoStatus(taskId);
  }
}
