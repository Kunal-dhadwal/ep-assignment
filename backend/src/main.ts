import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,    // Strip unneeded properties from requests
    forbidNonWhitelisted: true,  // Throw an error if unallowed properties are present
    transform: true,    // Automatically transform payloads to match DTO types
  }));

  await app.listen(5000);
}
bootstrap();
