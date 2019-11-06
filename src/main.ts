import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json())
  app.use(urlencoded({ extended: false }))
  app.enableCors()
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
