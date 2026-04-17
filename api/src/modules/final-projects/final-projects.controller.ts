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
  StreamableFile,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { FinalProjectsService } from './final-projects.service';
import { CreateFinalProjectDto } from './dto/create-final-project.dto';
import { UpdateFinalProjectDto } from './dto/update-final-project.dto';
import { FinalProjectQuerySchema, FinalProjectQueryDto } from './dto/query-final-project.dto';
import type { Response } from 'express';

@ApiTags('Final Projects')
@Controller('final-projects')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class FinalProjectsController {
  constructor(private readonly finalProjectsService: FinalProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new final project entry' })
  @ApiResponse({
    status: 201,
    description: 'The final project has been successfully created.',
  })
  create(
    @CurrentUser('uuid') uuid: string,
    @Body() createFinalProjectDto: CreateFinalProjectDto,
  ) {
    return this.finalProjectsService.create(uuid, createFinalProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all final projects' })
  @ApiResponse({
    status: 200,
    description: 'Returned all final projects successfully.',
  })
  findAll(
    @CurrentUser('uuid') uuid: string,
    @Query(new ZodValidationPipe(FinalProjectQuerySchema)) query: FinalProjectQueryDto,
  ) {
    return this.finalProjectsService.findAll(uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Retrieve a final project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({
    status: 200,
    description: 'Returned the final project successfully.',
  })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.finalProjectsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a final project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({
    status: 200,
    description: 'The final project has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  update(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() updateFinalProjectDto: UpdateFinalProjectDto,
  ) {
    return this.finalProjectsService.update(
      user_uuid,
      uuid,
      updateFinalProjectDto,
    );
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a final project by UUID' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({
    status: 200,
    description: 'The final project has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.finalProjectsService.remove(user_uuid, uuid);
  }

  @Post(':uuid/render')
  @ApiOperation({ summary: 'Start rendering a final project video' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({ status: 201, description: 'Render job queued successfully.' })
  @ApiResponse({ status: 404, description: 'Final project not found.' })
  @ApiResponse({ status: 409, description: 'Render already in progress.' })
  startRender(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.finalProjectsService.startRender(user_uuid, uuid);
  }

  @Get(':uuid/download')
  @ApiOperation({ summary: 'Download final rendered video' })
  @ApiParam({ name: 'uuid', description: 'The UUID of the final project' })
  @ApiResponse({ status: 200, description: 'Rendered video downloaded.' })
  @ApiResponse({ status: 404, description: 'Rendered video not found.' })
  async downloadVideo(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.finalProjectsService.downloadVideo(user_uuid, uuid);
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.filename}"`,
    );
    return new StreamableFile(file.buffer);
  }
}
