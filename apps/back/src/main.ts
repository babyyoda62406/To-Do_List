import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envVars } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('app.module'); 
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(envVars.PORT);
  logger.log(`Server is running on port ${envVars.PORT}`);
}
bootstrap();
