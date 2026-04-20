import * as sharp from 'sharp';
import { Logger } from '@nestjs/common';

const logger = new Logger('ImageProcessor');

/**
 * Ensures an image meets minimum dimension requirements.
 * If the image is smaller than the required dimensions, it will be upscaled.
 *
 * @param buffer The image buffer
 * @param minWidth Minimum width required
 * @param minHeight Minimum height required
 * @returns A promise that resolves to the processed buffer (original if no resize needed)
 */
export async function ensureMinDimensions(
  buffer: Buffer,
  minWidth: number = 300,
  minHeight: number = 300,
): Promise<Buffer> {
  try {
    const metadata = await sharp(buffer).metadata();

    const width = metadata.width || 0;

    const height = metadata.height || 0;

    if (width >= minWidth && height >= minHeight) {
      return buffer;
    }

    logger.log(
      `Resizing image from ${width}x${height} to at least ${minWidth}x${minHeight}`,
    );

    // Resize while maintaining aspect ratio, but ensuring both dimensions meet minimums
    // We use 'outside' to ensure the entire image is at least minWidth x minHeight
    return await sharp(buffer)
      .resize({
        width: width < minWidth ? minWidth : undefined,
        height: height < minHeight ? minHeight : undefined,
        fit: 'outside',
        withoutEnlargement: false, // We WANT to enlarge if too small
      })
      .toBuffer();
  } catch (error) {
    logger.error(`Error processing image dimensions: ${error.message}`);

    // Fallback to original buffer if processing fails
    return buffer;
  }
}
