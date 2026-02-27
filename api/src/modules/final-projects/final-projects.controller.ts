import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FinalProjectsService } from './final-projects.service';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';

@ApiTags('Final Projects')
@Controller('final-projects')
export class FinalProjectsController {
  constructor(private readonly finalProjectsService: FinalProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new final project entry' })
  @ApiResponse({ status: 201, description: 'The final project has been successfully created.' })
  create(@Body() createFinalProjectDto: CreateFinalProjectDto) {
    return this.finalProjectsService.create(createFinalProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all final projects' })
  @ApiResponse({ status: 200, description: 'Returned all final projects successfully.' })
  findAll() {
    return this.finalProjectsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a final project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({ status: 200, description: 'Returned the final project successfully.' })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  findOne(@Param('uuid') uuid: string) {
    return this.finalProjectsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a final project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({ status: 200, description: 'The final project has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  update(@Param('uuid') uuid: string, @Body() updateFinalProjectDto: UpdateFinalProjectDto) {
    return this.finalProjectsService.update(uuid, updateFinalProjectDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a final project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({ status: 200, description: 'The final project has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  remove(@Param('uuid') uuid: string) {
    return this.finalProjectsService.remove(uuid);
  }
}