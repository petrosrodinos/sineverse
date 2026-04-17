import { Injectable, Logger } from '@nestjs/common';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs/promises';
import { COMPOSITION_ID } from './render.types';
import type { FinalProjectCompositionProps } from './render.types';

@Injectable()
export class RenderService {
  private readonly logger = new Logger(RenderService.name);
  private bundleCache: string | null = null;

  private async getBundle(): Promise<string> {
    if (this.bundleCache) {
      return this.bundleCache;
    }

    this.logger.log('Creating Remotion bundle...');
    const entryPoint = path.resolve(process.cwd(), 'remotion', 'index.js');
    const publicDir = path.resolve(process.cwd(), '..', 'app', 'assets', 'estate-audios');

    this.bundleCache = await bundle({ entryPoint, publicDir });
    this.logger.log(`Remotion bundle ready: ${this.bundleCache}`);
    return this.bundleCache;
  }

  async render(inputProps: FinalProjectCompositionProps): Promise<Buffer> {
    const serveUrl = await this.getBundle();

    const serializedProps = inputProps as unknown as Record<string, unknown>;

    const composition = await selectComposition({
      serveUrl,
      id: COMPOSITION_ID,
      inputProps: serializedProps,
    });

    const outputPath = path.join(os.tmpdir(), `final-render-${Date.now()}.mp4`);

    this.logger.log(
      `Rendering ${composition.durationInFrames} frames at ${composition.fps}fps → ${outputPath}`,
    );

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: serializedProps,
      onProgress: ({ progress }) => {
        this.logger.debug(`Render progress: ${Math.round(progress * 100)}%`);
      },
    });

    const buffer = await fs.readFile(outputPath);
    await fs.unlink(outputPath).catch(() => {});
    return buffer;
  }
}
