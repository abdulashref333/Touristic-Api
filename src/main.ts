import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptions/exception-handler';
import { LoggingIncomingReqInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn'],
  });
  app.useGlobalFilters(new GlobalExceptionFilter(new Logger()));
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingIncomingReqInterceptor(new Logger()),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
