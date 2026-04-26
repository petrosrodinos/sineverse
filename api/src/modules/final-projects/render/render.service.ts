import { Injectable, Logger } from '@nestjs/common';
import {
  renderMedia,
  selectComposition,
  type DownloadBrowserProgressFn,
  type OnBrowserDownload,
} from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs/promises';
import { COMPOSITION_ID } from './render.types';
import type { FinalProjectCompositionProps } from './render.types';

@Injectable()
export class RenderService {
  private bundleCache: string | null = null;
  private readonly logger = new Logger(RenderService.name);
  private lastLoggedDownloadBucket = -1;

  private readonly browserDownloadProgress: DownloadBrowserProgressFn = (progress) => {
    const downloadedMb = (progress.downloadedBytes / (1024 * 1024)).toFixed(1);
    const totalMb = (progress.totalSizeInBytes / (1024 * 1024)).toFixed(1);
    const percent = progress.percent.toFixed(1);
    const percentValue = Number(percent);
    const currentBucket = Math.floor(percentValue / 10);
    const shouldLog =
      progress.alreadyAvailable ||
      currentBucket > this.lastLoggedDownloadBucket ||
      percentValue >= 99.9;

    if (!shouldLog) {
      return;
    }

    this.lastLoggedDownloadBucket = currentBucket;

    this.logger.log(
      `[Remotion Browser Download] ${percent}% | ${downloadedMb}/${totalMb} MB | alreadyAvailable=${progress.alreadyAvailable}`,
    );
  };

  private readonly onBrowserDownload: OnBrowserDownload = ({ chromeMode }) => {
    this.logger.log(`[Remotion Browser Download] Requested browser for mode=${chromeMode}`);
    return {
      onProgress: this.browserDownloadProgress,
      version: null,
    };
  };

  private async getBundle(): Promise<string> {
    if (this.bundleCache) {
      return this.bundleCache;
    }

    const entryPoint = path.resolve(process.cwd(), 'remotion', 'index.js');

    const publicDir = path.resolve(
      process.cwd(),
      '..',
      'app',
      'assets',
      'estate-audios',
    );

    this.bundleCache = await bundle({ entryPoint, publicDir });

    return this.bundleCache;
  }

  async render(inputProps: FinalProjectCompositionProps): Promise<Buffer> {
    const serveUrl = await this.getBundle();

    const serializedProps = inputProps as unknown as Record<string, unknown>;

    const composition = await selectComposition({
      serveUrl,
      id: COMPOSITION_ID,
      inputProps: serializedProps,
      onBrowserDownload: this.onBrowserDownload,
    });

    const outputPath = path.join(os.tmpdir(), `final-render-${Date.now()}.mp4`);

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: serializedProps,
      onBrowserDownload: this.onBrowserDownload,
    });

    const buffer = await fs.readFile(outputPath);

    await fs.unlink(outputPath).catch(() => {});

    return buffer;
  }
}
