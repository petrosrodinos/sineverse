import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SceneVideosService } from './scene-videos.service';
import { CreateSceneVideoDto } from './dto/create-scene-video.dto';
import { UpdateSceneVideoDto } from './dto/update-scene-video.dto';

@ApiTags('Scene Videos')
@Controller('scene-videos')
export class SceneVideosController {
  constructor(private readonly sceneVideosService: SceneVideosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scene video reference' })
  @ApiResponse({ status: 201, description: 'The scene video has been successfully created.' })
  create(@Body() createSceneVideoDto: CreateSceneVideoDto) {
    return this.sceneVideosService.create(createSceneVideoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scene videos' })
  @ApiResponse({ status: 200, description: 'Returned all scene videos successfully.' })
  findAll() {
    return this.sceneVideosService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a scene video by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene video' })
  @ApiResponse({ status: 200, description: 'Returned the scene video successfully.' })
  @ApiResponse({ status: 404, description: 'Scene video not found.' })
  findOne(@Param('uuid') uuid: string) {
    return this.sceneVideosService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a scene video by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene video' })
  @ApiResponse({ status: 200, description: 'The scene video has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Scene video not found.' })
  update(@Param('uuid') uuid: string, @Body() updateSceneVideoDto: UpdateSceneVideoDto) {
    return this.sceneVideosService.update(uuid, updateSceneVideoDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a scene video by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene video' })
  @ApiResponse({ status: 200, description: 'The scene video has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Scene video not found.' })
  remove(@Param('uuid') uuid: string) {
    return this.sceneVideosService.remove(uuid);
  }
}