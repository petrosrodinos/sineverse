import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TimelineClipsService } from './timeline-clips.service';
import { CreateTimelineClipDto } from './dto/create-timeline-clip.dto';
import { UpdateTimelineClipDto } from './dto/update-timeline-clip.dto';
import { TimelineClipQuerySchema, TimelineClipQueryDto } from './dto/query-timeline-clip.dto';

@ApiTags('Timeline Clips')
@Controller('timeline-clips')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class TimelineClipsController {
  constructor(private readonly timelineClipsService: TimelineClipsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a timeline clip' })
  create(@CurrentUser('uuid') user_uuid: string, @Body() dto: CreateTimelineClipDto) {
    return this.timelineClipsService.create(user_uuid, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List timeline clips for a final project' })
  findAll(
    @CurrentUser('uuid') user_uuid: string,
    @Query(new ZodValidationPipe(TimelineClipQuerySchema)) query: TimelineClipQueryDto,
  ) {
    return this.timelineClipsService.findAll(user_uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a timeline clip by UUID' })
  @ApiParam({ name: 'uuid' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.timelineClipsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a timeline clip' })
  @ApiParam({ name: 'uuid' })
  update(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateTimelineClipDto,
  ) {
    return this.timelineClipsService.update(user_uuid, uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a timeline clip' })
  @ApiParam({ name: 'uuid' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.timelineClipsService.remove(user_uuid, uuid);
  }
}
