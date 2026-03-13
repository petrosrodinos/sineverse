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

  async saveImageFromUrl(url: string, filename: string): Promise<string> {

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const mimetype = response.headers['content-type'] || 'image/png';

      return await this.saveImageFromBuffer(buffer, filename, mimetype);
    } catch (error) {
      throw error;
    }
  }

  async saveImageFromBuffer(buffer: Buffer, filename: string, mimetype: string): Promise<string> {

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
      const variation = await this.prisma.sceneVariation.findUnique({
        where: { uuid: variationUuid },
        include: { video: true }
      });

      if (variation?.video?.document_uuid) {
        await this.deleteDocument(variation.video.document_uuid);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteVariationDocuments(variationUuid: string): Promise<void> {
    try {
      const variation = await this.prisma.sceneVariation.findUnique({
        where: { uuid: variationUuid },
        include: {
          prompt_image: true,
          video: true
        }
      });

      if (!variation) return;

      if (variation.prompt_image?.document_uuid) {
        await this.deleteDocument(variation.prompt_image.document_uuid);
      }

      if (variation.video?.document_uuid) {
        await this.deleteDocument(variation.video.document_uuid);
      }
    } catch (error) {
      this.logger.error(`Error deleting documents for variation ${variationUuid}: ${error.message}`);
    }
  }

  async deleteSceneDocuments(sceneUuid: string): Promise<void> {
    try {
      const variations = await this.prisma.sceneVariation.findMany({
        where: { scene_uuid: sceneUuid },
        select: { uuid: true }
      });

      for (const variation of variations) {
        await this.deleteVariationDocuments(variation.uuid);
      }
    } catch (error) {
      this.logger.error(`Error deleting documents for scene ${sceneUuid}: ${error.message}`);
    }
  }

  async deleteProjectDocuments(projectUuid: string): Promise<void> {
    try {
      const scenes = await this.prisma.scene.findMany({
        where: { project_uuid: projectUuid },
        select: { uuid: true }
      });

      for (const scene of scenes) {
        await this.deleteSceneDocuments(scene.uuid);
      }
    } catch (error) {
      this.logger.error(`Error deleting documents for project ${projectUuid}: ${error.message}`);
    }
  }

}
