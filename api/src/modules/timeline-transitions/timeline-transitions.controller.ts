import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { TimelineTransitionsService } from './timeline-transitions.service';
import { CreateTimelineTransitionDto } from './dto/create-timeline-transition.dto';
import { UpdateTimelineTransitionDto } from './dto/update-timeline-transition.dto';

@ApiTags('Timeline Transitions')
@Controller('timeline-transitions')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class TimelineTransitionsController {
  constructor(private readonly timelineTransitionsService: TimelineTransitionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a timeline transition' })
  create(@Body() dto: CreateTimelineTransitionDto) {
    return this.timelineTransitionsService.create(dto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a timeline transition by UUID' })
  @ApiParam({ name: 'uuid' })
  findOne(@Param('uuid') uuid: string) {
    return this.timelineTransitionsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a timeline transition' })
  @ApiParam({ name: 'uuid' })
  update(@Param('uuid') uuid: string, @Body() dto: UpdateTimelineTransitionDto) {
    return this.timelineTransitionsService.update(uuid, dto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a timeline transition' })
  @ApiParam({ name: 'uuid' })
  remove(@Param('uuid') uuid: string) {
    return this.timelineTransitionsService.remove(uuid);
  }
}
