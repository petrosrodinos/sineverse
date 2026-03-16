import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectAssetsService } from './project-assets.service';
import { CreateProjectAssetDto, GenerateProjectAssetImageDto, CreateProjectAssetVideoDto } from './dto/create-project-asset.dto';
import { ProjectAssetQueryDto } from './dto/query-project-asset.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { EnrichProjectAssetVideoDto } from './dto/enrich-project-asset.dto';

@ApiTags('Project Assets')
@Controller('project-assets')
@UseGuards(JwtGuard)
export class ProjectAssetsController {
  constructor(private readonly projectAssetsService: ProjectAssetsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new project asset' })
  @ApiResponse({ status: 201, description: 'The project asset has been successfully created.' })
  create(@CurrentUser('uuid') user_uuid: string, @Body() createProjectAssetDto: CreateProjectAssetDto) {
    return this.projectAssetsService.create(user_uuid, createProjectAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all project assets' })
  @ApiResponse({ status: 200, description: 'Returned all project assets successfully.' })
  findAll(@CurrentUser('uuid') user_uuid: string, @Query() query: ProjectAssetQueryDto) {
    return this.projectAssetsService.findAll(user_uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a project asset by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'Returned the project asset successfully.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectAssetsService.findOne(user_uuid, uuid);
  }


  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a project asset by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'The project asset has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectAssetsService.remove(user_uuid, uuid);
  }

  @Patch(':uuid/select')
  @ApiOperation({ summary: 'Select a project asset' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'The project asset has been successfully selected.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  select(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectAssetsService.select(user_uuid, uuid);
  }

  @Post('scene-variations/:uuid/create-video')
  @ApiOperation({ summary: 'Create a video for a scene variation' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'The video has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  createVideo(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: CreateProjectAssetVideoDto,
  ) {
    return this.projectAssetsService.createVideo(user_uuid, uuid, dto);
  }

  @Post('scene-variations/:uuid/prompt-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a prompt image for a scene variation' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'The prompt image has been successfully uploaded.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  uploadPromptImage(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @UploadedFile() file: any,
  ) {
    return this.projectAssetsService.uploadPromptImage(user_uuid, uuid, file);
  }


  @Delete('scene-variations/:uuid/prompt-image')
  @ApiOperation({ summary: 'Remove a prompt image from a scene variation' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'The prompt image has been successfully removed.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  removePromptImage(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.projectAssetsService.removePromptImage(user_uuid, uuid);
  }

  @Post('scene-variations/:uuid/create-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Generate an image for a scene variation' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'The image has been successfully generated.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  createImage(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() generateImageDto: GenerateProjectAssetImageDto,
    @UploadedFile() file?: any,
  ) {
    return this.projectAssetsService.createImage(user_uuid, uuid, generateImageDto, file);
  }

  @Post(':uuid/enrich-video')
  @ApiOperation({ summary: 'Enrich a project asset by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'The project asset has been successfully enriched.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  enrich(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string, @Body() enrichProjectAssetVideoDto: EnrichProjectAssetVideoDto) {
    return this.projectAssetsService.enrichProjectAssetVideo(user_uuid, uuid, enrichProjectAssetVideoDto);
  }
}
