import {
  Controller,
  Get,
  Query,
  UseGuards,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TimelineMusicService } from './timeline-music.service';
import {
  TimelineMusicQueryDto,
  TimelineMusicQuerySchema,
} from './dto/query-timeline-music.dto';
import { UpsertTimelineMusicDto } from './dto/upsert-timeline-music.dto';

@ApiTags('Timeline Music')
@Controller('timeline-music')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class TimelineMusicController {
  constructor(private readonly timelineMusicService: TimelineMusicService) {}

  @Get()
  @ApiOperation({ summary: 'List timeline music for a final project' })
  findAll(
    @CurrentUser('uuid') user_uuid: string,
    @Query(new ZodValidationPipe(TimelineMusicQuerySchema))
    query: TimelineMusicQueryDto,
  ) {
    return this.timelineMusicService.findAll(user_uuid, query);
  }

  @Put('final-projects/:final_project_uuid')
  @ApiOperation({ summary: 'Create or update timeline music for a final project' })
  @ApiParam({ name: 'final_project_uuid' })
  upsertForFinalProject(
    @CurrentUser('uuid') user_uuid: string,
    @Param('final_project_uuid') final_project_uuid: string,
    @Body() dto: UpsertTimelineMusicDto,
  ) {
    return this.timelineMusicService.upsertForFinalProject(
      user_uuid,
      final_project_uuid,
      dto,
    );
  }
}
