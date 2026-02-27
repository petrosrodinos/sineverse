import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinalProjectsService } from './final-projects.service';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';

@Controller('final-projects')
export class FinalProjectsController {
  constructor(private readonly finalProjectsService: FinalProjectsService) {}

  @Post()
  create(@Body() createFinalProjectDto: CreateFinalProjectDto) {
    return this.finalProjectsService.create(createFinalProjectDto);
  }

  @Get()
  findAll() {
    return this.finalProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finalProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinalProjectDto: UpdateFinalProjectDto) {
    return this.finalProjectsService.update(+id, updateFinalProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finalProjectsService.remove(+id);
  }
}
