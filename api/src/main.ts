import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BULL_BOARD_ADAPTER } from './core/queues/queues.constants';
import { bullBoardAuthMiddleware } from './core/queues/bull-board.middleware';
import { ExpressAdapter } from '@bull-board/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const bullBoardAdapter = app.get<ExpressAdapter>(BULL_BOARD_ADAPTER);

  app.use(
    '/admin/queues',
    bullBoardAuthMiddleware(configService),
    bullBoardAdapter.getRouter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Appointly API')
    .setDescription('The Appointly API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const enabledCors =
    process.env.NODE_ENV !== 'local'
      ? [process.env.APP_URL]
      : ['http://localhost:3000'];

  app.enableCors({
    origin: enabledCors,
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Origin'],
  });

  await app.listen(3001);
}
bootstrap();
