import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BULL_BOARD_ADAPTER } from './core/queues/queues.constants';
import { bullBoardAuthMiddleware } from './core/queues/bull-board.middleware';
import { ExpressAdapter } from '@bull-board/express';
import { DecimalTransformInterceptor } from './core/interceptors/decimal-transform.interceptor';
import { parseCommaSeparatedOrigins } from './shared/utils/cors/cors-origins.utils';

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

  const nodeEnv = configService.get<string>('NODE_ENV');
  const appUrl = configService.get<string>('APP_URL');
  const corsOriginsEnv = configService.get<string>('CORS_ORIGINS');
  const extraOrigins = parseCommaSeparatedOrigins(corsOriginsEnv);

  const baseOrigins =
    nodeEnv === 'local'
      ? ['http://localhost:3000']
      : [...(appUrl ? [appUrl] : [])];

  const enabledCors = [...new Set([...baseOrigins, ...extraOrigins])];

  app.enableCors({
    origin: enabledCors,
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Origin'],
  });

  app.useGlobalInterceptors(new DecimalTransformInterceptor());

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port, '0.0.0.0');
}

bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);

  console.error(message);

  process.exit(1);
});
