import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  @ApiResponse({ status: 200, description: 'Returned all projects successfully.' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({ status: 200, description: 'Returned the project successfully.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  findOne(@Param('uuid') uuid: string) {
    return this.projectsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({ status: 200, description: 'The project has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  update(@Param('uuid') uuid: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(uuid, updateProjectDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  remove(@Param('uuid') uuid: string) {
    return this.projectsService.remove(uuid);
  }
}