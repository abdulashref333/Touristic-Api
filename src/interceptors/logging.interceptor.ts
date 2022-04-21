import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';

export interface Response<T> {
  status: number;
  data: T;
}

@Injectable()
export class LoggingIncomingReqInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly logger: Logger) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<IncomingMessage>();
    // throw new Error('just for testing logging');
    // console.log(`${request.method} ${request.url}`);
    this.logger.log(`${request.method} ${request.url}`);
    return next.handle();
  }
}
