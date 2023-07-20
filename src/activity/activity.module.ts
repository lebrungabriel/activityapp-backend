// Import necessary decorators and modules from NestJS
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import the ActivityService and ActivityController for activity-related operations
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

// Import the ActivitySchema for defining the activity Mongoose schema
import { ActivitySchema } from './schemas/activity.schema';

// Import the AuthModule for handling authentication related to activities
import { AuthModule } from 'src/auth/auth.module';

// Define the ActivityModule, responsible for activities-related functionalities
@Module({
  imports: [
    // Import the AuthModule to use authentication features for activities
    AuthModule,
    // Import the MongooseModule and specify the Activity model with its schema
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
  ],
  providers: [ActivityService], // Register the ActivityService as a provider
  controllers: [ActivityController], // Register the ActivityController as a controller
})
export class ActivityModule {}
