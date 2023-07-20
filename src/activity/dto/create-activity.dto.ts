import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from '../schemas/activity.schema';

export class CreateActivityDto {
  @IsNotEmpty()
  readonly category: Category;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly location: string;

  @IsNotEmpty()
  @IsInt()
  readonly price: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
