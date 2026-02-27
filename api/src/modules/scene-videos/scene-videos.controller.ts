import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SceneVideosService } from './scene-videos.service';
import { CreateSceneVideoDto } from './dto/create-scene-video.dto';
import { UpdateSceneVideoDto } from './dto/update-scene-video.dto';

@Controller('scene-videos')
export class SceneVideosController {
  constructor(private readonly sceneVideosService: SceneVideosService) {}

  @Post()
  create(@Body() createSceneVideoDto: CreateSceneVideoDto) {
    return this.sceneVideosService.create(createSceneVideoDto);
  }

  @Get()
  findAll() {
    return this.sceneVideosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneVideosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneVideoDto: UpdateSceneVideoDto) {
    return this.sceneVideosService.update(+id, updateSceneVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneVideosService.remove(+id);
  }
}
