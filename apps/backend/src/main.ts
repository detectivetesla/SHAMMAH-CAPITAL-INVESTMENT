import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from '@shammah/core-security';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // Security: Apply Global Validation Pipe from core-security
  app.useGlobalPipes(GlobalValidationPipe);

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  logger.log(`🚀 Shammah Capital Backend is running on: http://localhost:${port}/api/v1`);
  logger.log(`❤️ Health check: http://localhost:${port}/api/v1/health`);
}

bootstrap();
