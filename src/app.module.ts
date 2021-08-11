import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmConfig } from './app/config/ormConfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(OrmConfig),
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  static hostname: string;
  static isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('APP_PORT');
    AppModule.hostname = this.configService.get('APP_URL');
    AppModule.isProduction =
      this.configService.get('NODE_ENV') === 'production';
  }
}
