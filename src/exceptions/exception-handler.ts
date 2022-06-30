import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { HttpException, HttpStatus } from '@nestjs/common';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown): string => {
  // console.log(exception instanceof HttpException);
  return exception instanceof HttpException
    ? JSON.stringify(exception.getResponse())
    : String(exception);
  // return String(exception);
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = getStatusCode(exception);
    const messages =
      exception instanceof HttpException
        ? JSON.parse(getErrorMessage(exception))
        : getErrorMessage(exception);

    // console.log(`type : ${typeof messages}, ${messages}`);
    // console.log(typeof exception);

    if (code === 500) this.logger.error(`${messages}`);
    response.status(code).json({
      msg: messages.message ? messages.message : messages,
      path: request.url,
      status: code,
      success: 'faile',
      timestamp: new Date().toISOString(),
    });
  }
}
