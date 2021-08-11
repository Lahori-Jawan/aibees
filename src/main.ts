import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const APP_URL = `${AppModule.hostname}:${AppModule.port}`;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  if (!AppModule.isProduction) {
    const options = new DocumentBuilder()
      .setTitle('NestJS Realworld Example App')
      .setDescription('The Realworld API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'JWT',
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs', app, document);

    logger.debug(`docs available at ${APP_URL}/docs url`);
  }

  await app.listen(AppModule.port, () =>
    logger.verbose(`App started on port: ${AppModule.port}`),
  );
}

bootstrap();
