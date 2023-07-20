// Import necessary decorators and modules from NestJS
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';

// Import the Activity model and schema to be used in the service
import { Activity } from './schemas/activity.schema';

// Define the ActivityService as an injectable service in NestJS
@Injectable()
export class ActivityService {
  constructor(
    // Inject the Activity model into the service using InjectModel
    @InjectModel(Activity.name)
    private activityModel: Model<Activity>,
  ) {}

  // Find all activities in the database and return them
  async findAll(): Promise<Activity[]> {
    const activities = await this.activityModel.find();
    return activities;
  }

  // Find activities by category in the database and return them
  async findByCategory(category: Category): Promise<Activity[]> {
    const activities = await this.activityModel.find({ category });
    return activities;
  }

  // Find activities by city in the database and return them
  async findByCity(city: string): Promise<Activity[]> {
    const activities = await this.activityModel.find({ city });
    return activities;
  }

  // Find activities by user ID in the database and return them
  async findByUser(userId: string): Promise<Activity[]> {
    const activities = await this.activityModel.find({ user: userId });
    return activities;
  }

  // Create a new activity with the provided data and user information
  async create(activity: Activity, user: User): Promise<Activity> {
    // Assign the user's ID to the activity's 'user' field
    const data = Object.assign(activity, { user: user._id });

    // Create the new activity record in the database
    const res = await this.activityModel.create(data);
    return res;
  }

  // Find an activity by its ID in the database and return it
  async findById(id: string): Promise<Activity> {
    const activity = await this.activityModel.findById(id);

    // If no activity with the provided ID is found, throw a NotFoundException
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return activity;
  }
}
