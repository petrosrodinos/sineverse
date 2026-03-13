import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProjectAssetsService } from './project-assets.service';
import { CreateProjectAssetDto } from './dto/create-project-asset.dto';
import { UpdateProjectAssetDto } from './dto/update-project-asset.dto';
import { ProjectAssetQueryDto } from './dto/query-project-asset.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Project Assets')
@Controller('project-assets')
@UseGuards(JwtGuard)
export class ProjectAssetsController {
  constructor(private readonly projectAssetsService: ProjectAssetsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new project asset' })
  @ApiResponse({ status: 201, description: 'The project asset has been successfully created.' })
  create(@CurrentUser('uuid') user_uuid: string, @Body() createProjectAssetDto: CreateProjectAssetDto) {
    return this.projectAssetsService.create(user_uuid, createProjectAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all project assets' })
  @ApiResponse({ status: 200, description: 'Returned all project assets successfully.' })
  findAll(@CurrentUser('uuid') user_uuid: string, @Query() query: ProjectAssetQueryDto) {
    return this.projectAssetsService.findAll(user_uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a project asset by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'Returned the project asset successfully.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectAssetsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a project asset by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'The project asset has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  update(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateProjectAssetDto: UpdateProjectAssetDto,
  ) {
    return this.projectAssetsService.update(user_uuid, uuid, updateProjectAssetDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a project asset by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the project asset' })
  @ApiResponse({ status: 200, description: 'The project asset has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project asset not found.' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.projectAssetsService.remove(user_uuid, uuid);
  }
}
