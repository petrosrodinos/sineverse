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
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { TimelineCaptionsService } from './timeline-captions.service';
import { CreateTimelineCaptionDto } from './dto/create-timeline-caption.dto';
import { UpdateTimelineCaptionDto } from './dto/update-timeline-caption.dto';
import {
  TimelineCaptionQuerySchema,
  TimelineCaptionQueryDto,
} from './dto/query-timeline-caption.dto';

@ApiTags('Timeline Captions')
@Controller('timeline-captions')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class TimelineCaptionsController {
  constructor(
    private readonly timelineCaptionsService: TimelineCaptionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a timeline caption' })
  create(
    @CurrentUser('uuid') user_uuid: string,
    @Body() dto: CreateTimelineCaptionDto,
  ) {
    return this.timelineCaptionsService.create(user_uuid, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List captions for a clip' })
  findAll(
    @CurrentUser('uuid') user_uuid: string,
    @Query(new ZodValidationPipe(TimelineCaptionQuerySchema))
    query: TimelineCaptionQueryDto,
  ) {
    return this.timelineCaptionsService.findAll(user_uuid, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a caption by UUID' })
  @ApiParam({ name: 'uuid' })
  findOne(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.timelineCaptionsService.findOne(user_uuid, uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a caption' })
  @ApiParam({ name: 'uuid' })
  update(
    @CurrentUser('uuid') user_uuid: string,
    @Param('uuid') uuid: string,
    @Body() dto: UpdateTimelineCaptionDto,
  ) {
    return this.timelineCaptionsService.update(user_uuid, uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a caption' })
  @ApiParam({ name: 'uuid' })
  remove(@CurrentUser('uuid') user_uuid: string, @Param('uuid') uuid: string) {
    return this.timelineCaptionsService.remove(user_uuid, uuid);
  }
}
