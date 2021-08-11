import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@src/app/common/decorators/match';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { LoginDto } from './login-user.dto';

export class CreateUserDto extends LoginDto {
  @ApiProperty({ example: 'lahori' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'jawan' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Match('password')
  readonly confirmPassword: string;
}
