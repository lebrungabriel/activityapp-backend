import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  lastName: string;
}
