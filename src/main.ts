import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
console.log(process.env.SERVER_PORT, 'process.env.SERVER_PORT');
