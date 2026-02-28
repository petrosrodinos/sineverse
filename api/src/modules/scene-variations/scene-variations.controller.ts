import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { SceneVariationsService } from './scene-variations.service';
import { CreateSceneVariationDto } from './dto/create-scene-variation.dto';
import { UpdateSceneVariationDto } from './dto/update-scene-variation.dto';

@ApiTags('Scene Variations')
@Controller('scene-variations')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class SceneVariationsController {
    constructor(private readonly sceneVariationsService: SceneVariationsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new scene variation' })
    @ApiResponse({ status: 201, description: 'The scene variation has been successfully created.' })
    create(@CurrentUser('user_uuid') user_uuid: string, @Body() createSceneVariationDto: CreateSceneVariationDto) {
        return this.sceneVariationsService.create(user_uuid, createSceneVariationDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all scene variations' })
    @ApiResponse({ status: 200, description: 'Returned all scene variations successfully.' })
    findAll(@CurrentUser('user_uuid') user_uuid: string) {
        return this.sceneVariationsService.findAll(user_uuid);
    }

    @Get(':uuid')
    @ApiOperation({ summary: 'Retrieve a scene variation by UUID' })
    @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
    @ApiResponse({ status: 200, description: 'Returned the scene variation successfully.' })
    @ApiResponse({ status: 404, description: 'Scene variation not found.' })
    findOne(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
        return this.sceneVariationsService.findOne(user_uuid, uuid);
    }

    @Patch(':uuid')
    @ApiOperation({ summary: 'Update a scene variation by UUID' })
    @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
    @ApiResponse({ status: 200, description: 'The scene variation has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Scene variation not found.' })
    update(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string, @Body() updateSceneVariationDto: UpdateSceneVariationDto) {
        return this.sceneVariationsService.update(user_uuid, uuid, updateSceneVariationDto);
    }

    @Delete(':uuid')
    @ApiOperation({ summary: 'Delete a scene variation by UUID' })
    @ApiParam({ name: 'uuid', description: 'The UUID of the scene variation' })
    @ApiResponse({ status: 200, description: 'The scene variation has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Scene variation not found.' })
    remove(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
        return this.sceneVariationsService.remove(user_uuid, uuid);
    }
}