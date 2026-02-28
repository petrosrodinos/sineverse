import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ScenesService } from './scenes.service';
import { CreateSceneDto } from './dto/create-scene.dto';
import { UpdateSceneDto } from './dto/update-scene.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Scenes')
@Controller('scenes')
@UseGuards(JwtGuard)
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new scene' })
  @ApiResponse({ status: 201, description: 'The scene has been successfully created.' })
  create(@CurrentUser('user_uuid') user_uuid: string, @Body() createSceneDto: CreateSceneDto) {
    return this.scenesService.create(user_uuid, createSceneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scenes' })
  @ApiResponse({ status: 200, description: 'Returned all scenes successfully.' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.scenesService.findAll(user_uuid);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'Returned the scene successfully.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  findOne(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.scenesService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'The scene has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  update(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string, @Body() updateSceneDto: UpdateSceneDto) {
    return this.scenesService.update(user_uuid, uuid, updateSceneDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a scene by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the scene' })
  @ApiResponse({ status: 200, description: 'The scene has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Scene not found.' })
  remove(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.scenesService.remove(user_uuid, uuid);
  }
}