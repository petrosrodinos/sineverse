import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage, StorageOptions } from '@google-cloud/storage';
import { GcsConfig as GcsConfigInterface } from '../interfaces/gcs.interfaces';

@Injectable()
export class GcsConfig {
  private storageClient: Storage;
  private readonly logger = new Logger(GcsConfig.name);
  private config: GcsConfigInterface;

  constructor(private readonly configService: ConfigService) {
    this.initGcs();
  }

  private initGcs() {
    try {
      const projectId = this.configService.get<string>('GCS_PROJECT_ID');

      const bucketName = this.configService.get<string>('GCS_BUCKET_NAME');

      const credentialsBase64 = this.configService.get<string>(
        'GCS_CREDENTIALS_BASE64',
      );

      const folderName = this.configService.get<string>('GCS_FOLDER_NAME');

      if (!projectId || !bucketName) {
        this.logger.error('GCS_PROJECT_ID and GCS_BUCKET_NAME are required');

        return;
      }

      this.config = {
        project_id: projectId,
        bucket_name: bucketName,
        credentials: credentialsBase64
          ? JSON.parse(
              Buffer.from(credentialsBase64, 'base64').toString('utf8'),
            )
          : undefined,
        folder_name: folderName || 'documents',
      };

      const storageOptions: StorageOptions = {
        projectId: this.config.project_id,
      };

      if (this.config.credentials) {
        storageOptions.credentials = this.config.credentials;
      }

      this.storageClient = new Storage(storageOptions);

      this.logger.debug('Google Cloud Storage initialized');
    } catch (error) {
      this.logger.error('Error initializing Google Cloud Storage', error);
    }
  }

  getStorageClient(): Storage {
    return this.storageClient;
  }

  getConfig(): GcsConfigInterface {
    return this.config;
  }

  getBucketName(): string {
    return this.config.bucket_name;
  }
}
