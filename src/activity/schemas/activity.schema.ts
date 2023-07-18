import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type ActivityDocument = Document & Activity;

@Schema()
export class Activity {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User; // Reference to User collection
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
