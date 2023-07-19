import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum Category {
  HIKING = 'randonnée',
  SURF = 'surf',
  YOGA = 'yoga',
  BIKING = 'vélo',
  CLIMBING = 'escalade',
  TRAIL = 'trail',
}

@Schema()
export class Activity {
  @Prop({ required: true })
  category: Category;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User; // Reference to User collection
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
