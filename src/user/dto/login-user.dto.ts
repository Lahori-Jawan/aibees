import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@demo.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @Length(6, 10)
  readonly password: string;
}
