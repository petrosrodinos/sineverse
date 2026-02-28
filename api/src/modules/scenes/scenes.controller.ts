import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';

@ApiTags('Scenes')
@Controller('scenes')
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new scene' })
  @ApiResponse({ status: 201, description: 'The scene has been successfully created.' })
  create(@Body() createSceneDto: CreateSceneDto) {
    return this.scenesService.create(createSceneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scenes' })
  @ApiResponse({ status: 200, description: 'Returned all scenes successfully.' })
  findAll() {
    return this.scenesService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'Returned the scene successfully.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  findOne(@Param('uuid') uuid: string) {
    return this.scenesService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'The scene has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  update(@Param('uuid') uuid: string, @Body() updateSceneDto: UpdateSceneDto) {
    return this.scenesService.update(uuid, updateSceneDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'The scene has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  remove(@Param('uuid') uuid: string) {
    return this.scenesService.remove(uuid);
  }
}