import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity, Category } from './schemas/activity.schema';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  async getAllActivities(
    @Query('category') category: Category,
  ): Promise<Activity[]> {
    if (category) {
      return this.activityService.findByCategory(category);
    }

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
