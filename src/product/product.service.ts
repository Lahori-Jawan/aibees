import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/app/common/messages';
import { ServerException } from '@src/app/common/exceptions/server';
import { Product } from './entities/product.entity';
import { DiscountProductDto } from './dto/discount-product.dto';
import trycatch from '@src/utils/betterCatch';

@Injectable()
export class ProductService {
  logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async applyDiscount(discountProductDto: DiscountProductDto) {
    const [error, product] = await trycatch(
      this.getProductByCode(discountProductDto.code),
    );

    if (error) {
      this.logger.error(JSON.stringify(error, null, 2));
      throw new ServerException();
    }

    if (!product) throw new BadRequestException(messages.NOT_FOUND);

    let discount = (product.discount || product.category?.discount) ?? 0;

    if (!discount) {
      // get all parent categories
      const categories = await this.getAllParentCategories(product.category.id);
      if (categories.length) {
        for (const cat of categories) {
          if (cat.discount) {
            discount = cat.discount;
            break;
          }
        }
      }
    }

    return {
      productPrice: product.price,
      discountedPrice: discount ? product.price - discount : -1,
    };
  }

  async getProductByCode(code: string) {
    return await this.productRepository.findOne({
      where: { code },
      relations: ['category'],
    });
  }

  async getAllParentCategories(id: number) {
    const arrayObj = await this.productRepository.query(`
      WITH RECURSIVE category AS (
        SELECT id, name, discount, parent
        FROM categories
        WHERE id=${id}
        UNION ALL
        SELECT cat.id, cat.name, cat.discount, cat.parent
        FROM categories cat
        JOIN category
        ON category.parent=cat.id
      )

      SELECT id, parent, CAST (discount AS DOUBLE PRECISION)
      FROM category
      WHERE id != ${id}  -- excluding reference id
    `);

    return arrayObj;
  }
}
