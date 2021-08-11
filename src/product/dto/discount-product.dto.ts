import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DiscountProductDto {
  @ApiProperty({ example: 'lc759p2HbdUOut9jZNJfR' })
  @IsString()
  code: string;
}
