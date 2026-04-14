import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { SceneVariationQueryDto } from './dto/query-scene-variation.dto';
import { AiHelperService } from '@/shared/services/ai-helper/services/ai-helper.service';
import { DocumentsService } from '../documents/documents.service';
import { AssetRole, AssetStatus, DocumentType } from '@/generated/prisma';

@Injectable()
export class SceneVariationsService {
  private readonly logger = new Logger(SceneVariationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiHelperService: AiHelperService,
    private readonly documentsService: DocumentsService,
  ) {}

  async create(
    user_uuid: string,
    createSceneVariationDto: CreateSceneVariationDto,
  ) {
    try {
      const scene = await this.prisma.scene.findFirst({
        where: { uuid: createSceneVariationDto.scene_uuid, user_uuid },
      });
      if (!scene) throw new NotFoundException('Scene not found');

      const variation = await this.prisma.sceneVariation.create({
        data: {
          title: createSceneVariationDto.title,
          selected: createSceneVariationDto.selected ?? false,
          user_uuid,
          scene_uuid: scene.uuid,
        },
      });

      return variation;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to create scene variation',
        { cause: error },
      );
    }
  }

  async findAll(user_uuid: string, query: SceneVariationQueryDto) {
    try {
      const where: any = {
        user_uuid,
        ...(query.scene_uuid && { scene_uuid: query.scene_uuid }),
      };

      const variations = await this.prisma.sceneVariation.findMany({
        where,
      });

      return variations;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to retrieve scene variations',
        { cause: error },
      );
    }
  }

  async findOne(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: {
          project_assets: { include: { document: true } },
          scene: true,
        },
      });
      if (!variation) throw new NotFoundException('Scene variation not found');
      return variation;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to retrieve scene variation',
        { cause: error },
      );
    }
  }

  async update(
    user_uuid: string,
    uuid: string,
    updateSceneVariationDto: UpdateSceneVariationDto,
  ) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: { project_assets: true },
      });

      if (!variation) throw new NotFoundException('Scene variation not found');

      const variationUpdateData: any = {};
      if (updateSceneVariationDto.title !== undefined)
        variationUpdateData.title = updateSceneVariationDto.title;
      if (updateSceneVariationDto.selected !== undefined)
        variationUpdateData.selected = updateSceneVariationDto.selected;

      const performUpdates = async (tx: any) => {
        if (updateSceneVariationDto.selected === true) {
          await tx.sceneVariation.updateMany({
            where: {
              scene_uuid: variation.scene_uuid,
              uuid: { not: uuid },
              user_uuid,
            },
            data: { selected: false },
          });
        }

        if (Object.keys(variationUpdateData).length > 0) {
          await tx.sceneVariation.update({
            where: { uuid },
            data: variationUpdateData,
          });
        }

        return tx.sceneVariation.findUnique({
          where: { uuid },
          include: {
            project_assets: { include: { document: true } },
            scene: true,
          },
        });
      };

      const result = await this.prisma.$transaction(performUpdates);

      return result;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to update scene variation',
        { cause: error },
      );
    }
  }

  async remove(user_uuid: string, uuid: string) {
    try {
      await this.findOne(user_uuid, uuid);
      await this.documentsService.deleteVariationDocuments(uuid);
      return await this.prisma.sceneVariation.delete({ where: { uuid } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete scene variation',
        { cause: error },
      );
    }
  }

  async duplicate(user_uuid: string, uuid: string) {
    try {
      const variation = await this.prisma.sceneVariation.findFirst({
        where: { uuid, user_uuid },
        include: { project_assets: true },
      });
      if (!variation) throw new NotFoundException('Scene variation not found');

      const {
        id,
        uuid: oldUuid,
        created_at,
        updated_at,
        selected,
        ai_generated,
        project_assets,
        ...dataToCopy
      } = variation;

      const oldVideoAsset = project_assets.find(
        (pa) => pa.role === AssetRole.GENERATED_VIDEO,
      );
      const metadataToCopy = oldVideoAsset ? oldVideoAsset.metadata || {} : {};

      const scene = await this.prisma.scene.findFirst({
        where: { uuid: variation.scene_uuid },
      });

      const newVariation = await this.prisma.sceneVariation.create({
        data: {
          ...dataToCopy,
          title: `${variation.title} (Copy)`,
          selected: false,
          project_assets: {
            create: {
              user_uuid,
              project_uuid: scene?.project_uuid || '',
              type: DocumentType.VIDEO,
              role: AssetRole.GENERATED_VIDEO,
              status: AssetStatus.PENDING,
              metadata: metadataToCopy as any,
            },
          },
        },
        include: {
          project_assets: { include: { document: true } },
        },
      });
      return newVariation;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to duplicate scene variation',
        { cause: error },
      );
    }
  }
}
