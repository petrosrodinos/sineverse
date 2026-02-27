import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SceneVariationsService } from './scene-variations.service';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';

@ApiTags('Scene Variations')
@Controller('scene-variations')
export class SceneVariationsController {
  constructor(private readonly sceneVariationsService: SceneVariationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scene variation' })
  @ApiResponse({ status: 201, description: 'The scene variation has been successfully created.' })
  create(@Body() createSceneVariationDto: CreateSceneVariationDto) {
    return this.sceneVariationsService.create(createSceneVariationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scene variations' })
  @ApiResponse({ status: 200, description: 'Returned all scene variations successfully.' })
  findAll() {
    return this.sceneVariationsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a scene variation by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'Returned the scene variation successfully.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  findOne(@Param('uuid') uuid: string) {
    return this.sceneVariationsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a scene variation by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'The scene variation has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  update(@Param('uuid') uuid: string, @Body() updateSceneVariationDto: UpdateSceneVariationDto) {
    return this.sceneVariationsService.update(uuid, updateSceneVariationDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a scene variation by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
  @ApiResponse({ status: 200, description: 'The scene variation has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Scene variation not found.' })
  remove(@Param('uuid') uuid: string) {
    return this.sceneVariationsService.remove(uuid);
  }
}