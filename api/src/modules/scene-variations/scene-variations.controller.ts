import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SceneVariationsService } from './scene-variations.service';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';

@Controller('scene-variations')
export class SceneVariationsController {
  constructor(private readonly sceneVariationsService: SceneVariationsService) {}

  @Post()
  create(@Body() createSceneVariationDto: CreateSceneVariationDto) {
    return this.sceneVariationsService.create(createSceneVariationDto);
  }

  @Get()
  findAll() {
    return this.sceneVariationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneVariationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneVariationDto: UpdateSceneVariationDto) {
    return this.sceneVariationsService.update(+id, updateSceneVariationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneVariationsService.remove(+id);
  }
}
