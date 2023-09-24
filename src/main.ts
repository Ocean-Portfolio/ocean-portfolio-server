import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as dotenv from 'dotenv';
import { EmbedBuilder, WebhookClient } from 'discord.js';
import selfCheckWithDBConnection from './selfCheckWithDBConnection';
import discordWebhookSend from './discordWebhookSend';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.setGlobalPrefix('api');

  await app.listen(process.env.SERVER_PORT);

  const isCheckIn = await selfCheckWithDBConnection();

  if (isCheckIn === true && process.env.NODE_ENV === 'production') {
    discordWebhookSend();
  }
}

bootstrap();
