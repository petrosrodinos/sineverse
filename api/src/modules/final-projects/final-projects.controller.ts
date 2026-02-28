import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { FinalProjectsService } from './final-projects.service';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';

@ApiTags('Final Projects')
@Controller('final-projects')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class FinalProjectsController {
    constructor(private readonly finalProjectsService: FinalProjectsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new final project entry' })
    @ApiResponse({ status: 201, description: 'The final project has been successfully created.' })
    create(@CurrentUser('user_uuid') user_uuid: string, @Body() createFinalProjectDto: CreateFinalProjectDto) {
        return this.finalProjectsService.create(user_uuid, createFinalProjectDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all final projects' })
    @ApiResponse({ status: 200, description: 'Returned all final projects successfully.' })
    findAll(@CurrentUser('user_uuid') user_uuid: string) {
        return this.finalProjectsService.findAll(user_uuid);
    }

    @Get(':uuid')
    @ApiOperation({ summary: 'Retrieve a final project by UUID' })
    @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
    @ApiResponse({ status: 200, description: 'Returned the final project successfully.' })
    @ApiResponse({ status: 404, description: 'Final project not found.' })
    findOne(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
        return this.finalProjectsService.findOne(user_uuid, uuid);
    }

    @Patch(':uuid')
    @ApiOperation({ summary: 'Update a final project by UUID' })
    @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
    @ApiResponse({ status: 200, description: 'The final project has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Final project not found.' })
    update(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string, @Body() updateFinalProjectDto: UpdateFinalProjectDto) {
        return this.finalProjectsService.update(user_uuid, uuid, updateFinalProjectDto);
    }

    @Delete(':uuid')
    @ApiOperation({ summary: 'Delete a final project by UUID' })
    @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
    @ApiResponse({ status: 200, description: 'The final project has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Final project not found.' })
    remove(@CurrentUser('user_uuid') user_uuid: string, @Param('uuid') uuid: string) {
        return this.finalProjectsService.remove(user_uuid, uuid);
    }
}