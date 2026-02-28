import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';


@ApiTags('Projects')
@Controller('projects')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  create(@CurrentUser('user_uuid') user_uuid: string, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(user_uuid, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  @ApiResponse({ status: 200, description: 'Returned all projects successfully.' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.projectsService.findAll(user_uuid);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({ status: 200, description: 'Returned the project successfully.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  findOne(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({ status: 200, description: 'The project has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  update(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(user_uuid, uuid, updateProjectDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  remove(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectsService.remove(user_uuid, uuid);
  }
}