import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { EnrichProjectDto } from './dto/enrich-project.dto';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import {
  ProjectsQueryDto,
  ProjectsQuerySchema,
} from './dto/query-projects.dto';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
  })
  create(
    @CurrentUser('uuid') uuid: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(uuid, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  @ApiResponse({
    status: 200,
    description: 'Returned all projects successfully.',
  })
  findAll(
    @CurrentUser('uuid') uuid: string,
    @Query(new ZodValidationPipe(ProjectsQuerySchema)) query: ProjectsQueryDto,
  ) {
    return this.projectsService.findAll(uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({
    status: 200,
    description: 'Returned the project successfully.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  update(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(user_uuid, uuid, updateProjectDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectsService.remove(user_uuid, uuid);
  }

  @Post(':uuid/enrich-concept')
  @ApiOperation({ summary: 'Enrich a project concept by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project' })
  @ApiResponse({
    status: 200,
    description: 'The project concept has been successfully enriched.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  enrichProjectConcept(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() enrichProjectDto: EnrichProjectDto,
  ) {
    return this.projectsService.enrichProjectConcept(
      user_uuid,
      uuid,
      enrichProjectDto,
    );
  }
}
