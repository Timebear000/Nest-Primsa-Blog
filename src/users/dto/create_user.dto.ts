import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
