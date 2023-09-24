import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as dotenv from 'dotenv';
// import { json, urlencoded } from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  app.setGlobalPrefix('api');
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
console.log(process.env.SERVER_PORT, 'process.env.SERVER_PORT');
