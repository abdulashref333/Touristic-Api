import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptions/exception-handler';
import { LoggingIncomingReqInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn'],
  });

  // const cookieParserOptions: CookieParseOptions = {
  //   maxAge: Number(60 * 60 * 24 * 7), // 1 week
  // };
  app.enableCors();
  app.use(cookieParser());
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

  const config = new DocumentBuilder()
    .setTitle('Aswany API')
    .setDescription('An API For serving Tourists that comming to Aswan.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
