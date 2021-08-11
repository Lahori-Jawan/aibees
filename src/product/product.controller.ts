import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiscountProductDto } from './dto/discount-product.dto';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Apply discount' })
  @Post('apply-discount')
  create(@Body() createUserDto: DiscountProductDto) {
    return this.productService.applyDiscount(createUserDto);
  }
}
