import { Injectable } from '@nestjs/common';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';

@Injectable()
export class SceneVariationsService {
  create(createSceneVariationDto: CreateSceneVariationDto) {
    return 'This action adds a new sceneVariation';
  }

  findAll() {
    return `This action returns all sceneVariations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sceneVariation`;
  }

  update(id: number, updateSceneVariationDto: UpdateSceneVariationDto) {
    return `This action updates a #${id} sceneVariation`;
  }

  remove(id: number) {
    return `This action removes a #${id} sceneVariation`;
  }
}
