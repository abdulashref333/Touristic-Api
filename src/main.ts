import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptions/exception-handler';
import { LoggingIncomingReqInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn'],
  });

  // const cookieParserOptions: CookieParseOptions = {
  //   maxAge: Number(60 * 60 * 24 * 7), // 1 week
  // };
  // app.use(bodyParser.json());
  app.enableCors();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
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

  // create images file structuer.
  if (!fs.existsSync('./images')) fs.mkdirSync('./images');
  if (!fs.existsSync('./images/avatars')) fs.mkdirSync('./images/avatars');
  if (!fs.existsSync('./images/blogs')) fs.mkdirSync('./images/blogs');
  if (!fs.existsSync('./images/hostels')) fs.mkdirSync('./images/hostels');
  if (!fs.existsSync('./images/restaurants'))
    fs.mkdirSync('./images/restaurants');
  if (!fs.existsSync('./images/historical_places'))
    fs.mkdirSync('./images/historical_places');

  await app.listen(parseInt(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
