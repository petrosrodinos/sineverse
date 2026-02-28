import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SceneVideosService } from './scene-videos.service';
import { CreateSceneVideoDto } from './dto/create-scene-video.dto';
import { UpdateSceneVideoDto } from './dto/update-scene-video.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Scene Videos')
@Controller('scene-videos')
@UseGuards(JwtGuard)
export class SceneVideosController {
  constructor(private readonly sceneVideosService: SceneVideosService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new scene video reference' })
  @ApiResponse({ status: 201, description: 'The scene video has been successfully created.' })
  create(@CurrentUser('user_uuid') user_uuid: string, @Body() createSceneVideoDto: CreateSceneVideoDto) {
    return this.sceneVideosService.create(user_uuid, createSceneVideoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scene videos' })
  @ApiResponse({ status: 200, description: 'Returned all scene videos successfully.' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.sceneVideosService.findAll(user_uuid);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a scene video by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene video' })
  @ApiResponse({ status: 200, description: 'Returned the scene video successfully.' })
  @ApiResponse({ status: 404, description: 'Scene video not found.' })
  findOne(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.sceneVideosService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a scene video by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene video' })
  @ApiResponse({ status: 200, description: 'The scene video has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Scene video not found.' })
  update(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string, @Body() updateSceneVideoDto: UpdateSceneVideoDto) {
    return this.sceneVideosService.update(user_uuid, uuid, updateSceneVideoDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a scene video by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene video' })
  @ApiResponse({ status: 200, description: 'The scene video has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Scene video not found.' })
  remove(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.sceneVideosService.remove(user_uuid, uuid);
  }
}