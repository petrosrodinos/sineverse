import { Injectable } from '@nestjs/common';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';

@Injectable()
export class FinalProjectsService {
  create(createFinalProjectDto: CreateFinalProjectDto) {
    return 'This action adds a new finalProject';
  }

  findAll() {
    return `This action returns all finalProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} finalProject`;
  }

  update(id: number, updateFinalProjectDto: UpdateFinalProjectDto) {
    return `This action updates a #${id} finalProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} finalProject`;
  }
}
