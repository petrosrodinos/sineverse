import { Injectable } from '@nestjs/common';
import { CreateSceneVideoDto } from './dto/create-scene-video.dto';
import { UpdateSceneVideoDto } from './dto/update-scene-video.dto';

@Injectable()
export class SceneVideosService {
  create(createSceneVideoDto: CreateSceneVideoDto) {
    return 'This action adds a new sceneVideo';
  }

  findAll() {
    return `This action returns all sceneVideos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sceneVideo`;
  }

  update(id: number, updateSceneVideoDto: UpdateSceneVideoDto) {
    return `This action updates a #${id} sceneVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} sceneVideo`;
  }
}
