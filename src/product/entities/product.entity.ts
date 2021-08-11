import { AbstractEntity } from '@src/app/common/baseEntity';
import { ColumnNumericTransformer } from '@src/app/common/transformers/numeric';
import { Category } from '@src/category/entities/category.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('products')
export class Product extends AbstractEntity {
  @Column()
  name: string;

  @Column({ name: 'sku_id' })
  sku: string;

  @Column()
  code: string;

  @Column()
  price: number;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
