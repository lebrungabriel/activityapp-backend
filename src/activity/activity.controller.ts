// Import necessary decorators and modules from NestJS
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

// Import the ActivityService and CreateActivityDto for handling activities-related operations
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';

// Import the Activity and Category interfaces for type-checking
import { Activity, Category } from './schemas/activity.schema';

// Define the controller route base path as '/activity'
@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  // Define a GET endpoint to fetch activities based on category and city query parameters
  @Get()
  async getAllActivities(
    @Query('category') category: Category,
    @Query('city') city: string,
  ): Promise<Activity[]> {
    if (category) {
      return this.activityService.findByCategory(category);
    } else if (city) {
      return this.activityService.findByCity(city);
    }

    // If no category or city query parameter is provided, fetch all activities
    return this.activityService.findAll();
  }

  // Define a GET endpoint to fetch activities associated with a specific user
  @Get('/user/:userId')
  async getActivitiesByUser(
    @Param('userId') userId: string,
  ): Promise<Activity[]> {
    return this.activityService.findByUser(userId);
  }

  // Define a POST endpoint to create a new activity
  @Post('/new')
  @UseGuards(AuthGuard()) // Apply the AuthGuard to protect the endpoint
  async createActivity(
    @Body() createActivityDto: CreateActivityDto, // Request body containing activity data
    @Req() req, // Request object to access user details (from AuthGuard)
  ): Promise<Activity> {
    console.log(createActivityDto); // Log the incoming createActivityDto for debugging
    return this.activityService.create(createActivityDto, req.user);
  }

  // Define a GET endpoint to fetch a specific activity by its id
  @Get('/:id')
  async getActivity(@Param('id') id: string): Promise<Activity> {
    return this.activityService.findById(id);
  }
}
