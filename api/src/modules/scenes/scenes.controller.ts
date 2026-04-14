import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { ReorderScenesDto } from './dto/reorder-scenes.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { SceneQuerySchema, SceneQueryDto } from './dto/query-scene.dto';
import { GenerateAiScenesDto } from './dto/generate-ai-scenes.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateEstateScenesFromImagesDto } from './dto/create-estate-scenes-from-images.dto';

type UploadedSceneImageFile = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
};

@ApiTags('Scenes')
@Controller('scenes')
@UseGuards(JwtGuard)
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scene' })
  @ApiResponse({
    status: 201,
    description: 'The scene has been successfully created.',
  })
  create(
    @CurrentUser('uuid') user_uuid: string,
    @Body() createSceneDto: CreateSceneDto,
  ) {
    return this.scenesService.create(user_uuid, createSceneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scenes' })
  @ApiResponse({
    status: 200,
    description: 'Returned all scenes successfully.',
  })
  @ApiQuery({
    name: 'project_uuid',
    required: false,
    description: 'Filter scenes by project UUID',
  })
  findAll(
    @CurrentUser('uuid') user_uuid: string,
    @Query(new ZodValidationPipe(SceneQuerySchema)) query: SceneQueryDto,
  ) {
    return this.scenesService.findAll(user_uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'Returned the scene successfully.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.scenesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({
    status: 200,
    description: 'The scene has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  update(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateSceneDto: UpdateSceneDto,
  ) {
    return this.scenesService.update(user_uuid, uuid, updateSceneDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({
    status: 200,
    description: 'The scene has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.scenesService.remove(user_uuid, uuid);
  }

  @Post('generate-ai-scenes')
  @ApiOperation({ summary: 'Generate AI scenes' })
  @ApiResponse({
    status: 200,
    description: 'The AI scenes have been successfully generated.',
  })
  generateAiScenes(
    @CurrentUser('uuid') user_uuid: string,
    @Body() generateAiScenesDto: GenerateAiScenesDto,
  ) {
    return this.scenesService.generateAiScenes(user_uuid, generateAiScenesDto);
  }

  @Post('reorder')
  @ApiOperation({ summary: 'Reorder scenes' })
  @ApiResponse({
    status: 200,
    description: 'The scenes have been successfully reordered.',
  })
  reorder(@Body() reorderScenesDto: ReorderScenesDto) {
    return this.scenesService.reorder(reorderScenesDto);
  }

  @Post('estate/from-images')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Create estate scenes from uploaded images' })
  @ApiResponse({
    status: 201,
    description: 'Estate scenes created from images successfully.',
  })
  createEstateScenesFromImages(
    @CurrentUser('uuid') user_uuid: string,
    @Body() dto: CreateEstateScenesFromImagesDto,
    @UploadedFiles() files: UploadedSceneImageFile[],
  ) {
    return this.scenesService.createEstateScenesFromImages(
      user_uuid,
      dto,
      files,
    );
  }
}
