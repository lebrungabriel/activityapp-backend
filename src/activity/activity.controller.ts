import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './schemas/activity.schema';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  async getAllActivities(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Post('/new')
  @UseGuards(AuthGuard())
  async createActivity(
    @Body() createActivityDto: CreateActivityDto,
    @Req() req,
  ): Promise<Activity> {
    console.log(createActivityDto);
    return this.activityService.create(createActivityDto, req.user);
  }

  @Get('/:id')
  async getActivity(@Param('id') id: string): Promise<Activity> {
    return this.activityService.findById(id);
  }
}
