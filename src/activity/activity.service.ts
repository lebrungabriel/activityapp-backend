import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';

import { Activity } from './schemas/activity.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: Model<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    const activities = await this.activityModel.find();
    return activities;
  }

  async findByCategory(category: Category): Promise<Activity[]> {
    const activities = await this.activityModel.find({ category });
    return activities;
  }

  async create(activity: Activity, user: User): Promise<Activity> {
    const data = Object.assign(activity, { user: user._id });

    const res = await this.activityModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Activity> {
    const activity = await this.activityModel.findById(id);

    if (!Activity) {
      throw new NotFoundException('Activity not found');
    }

    return activity;
  }
}
