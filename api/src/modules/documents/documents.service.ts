import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { GcsService } from '@/integrations/storage/gcs/services/gcs.service';
import { DocumentType } from '@/generated/prisma';
import axios from 'axios';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gcsService: GcsService,
  ) { }

  async saveVideoFromUrl(url: string, filename: string): Promise<string> {
    this.logger.log(`Saving video from URL: ${url}`);

    try {
      // 1. Download video from provider URL
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      return await this.saveVideoFromBuffer(buffer, filename);
    } catch (error) {
      this.logger.error(`Error saving video from URL to GCP: ${error.message}`);
      throw error;
    }
  }

  async saveVideoFromBuffer(buffer: Buffer, filename: string): Promise<string> {
    this.logger.log(`Saving video buffer as: ${filename}`);

    try {
      // 1. Upload to GCS
      const uploadResponse = await this.gcsService.uploadImageFromBuffer(
        buffer,
        filename,
        'video/mp4',
      );

      // 2. Create Document record
      const document = await this.prisma.document.create({
        data: {
          filename,
          mimetype: 'video/mp4',
          size: buffer.length,
          url: uploadResponse.url,
          path: uploadResponse.path,
          type: DocumentType.VIDEO,
        },
      });

      return document.uuid;
    } catch (error) {
      this.logger.error(`Error saving video buffer to GCP: ${error.message}`);
      throw error;
    }
  }

  async saveImageFromBuffer(buffer: Buffer, filename: string, mimetype: string): Promise<string> {
    this.logger.log(`Saving image buffer as: ${filename}`);

    try {
      // 1. Upload to GCS
      const uploadResponse = await this.gcsService.uploadImageFromBuffer(
        buffer,
        filename,
        mimetype,
      );

      // 2. Create Document record
      const document = await this.prisma.document.create({
        data: {
          filename,
          mimetype,
          size: buffer.length,
          url: uploadResponse.url,
          path: uploadResponse.path,
          type: DocumentType.IMAGE,
        },
      });

      return document.uuid;
    } catch (error) {
      this.logger.error(`Error saving image buffer to GCP: ${error.message}`);
      throw error;
    }
  }


  async deleteDocument(documentUuid: string): Promise<void> {
    try {
      const document = await this.prisma.document.findUnique({
        where: { uuid: documentUuid }
      });

      if (!document) {
        return;
      }

      try {
        await this.gcsService.deleteImage({
          filename: document.path,
        });
      } catch (error) {
      }

      await this.prisma.document.delete({
        where: { uuid: documentUuid }
      });

    } catch (error) {
      throw error;
    }
  }

  async deleteExistingVideoForVariation(variationUuid: string): Promise<void> {
    try {
      const sceneVideo = await this.prisma.sceneVideo.findUnique({
        where: { scene_variation_uuid: variationUuid },
        include: { video: true }
      });

      if (sceneVideo?.video_uuid) {
        await this.deleteDocument(sceneVideo.video_uuid);
      }
    } catch (error) {
      throw error;
    }
  }


}
