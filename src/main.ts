import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import selfCheckWithDBConnection from './selfCheckWithDBConnection';
import discordWebhookSend from './discordWebhookSend';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.SERVER_PORT);

  const isCheckIn = await selfCheckWithDBConnection();

  if (isCheckIn === true && process.env.NODE_ENV === 'production') {
    discordWebhookSend();
  }
}

bootstrap();
