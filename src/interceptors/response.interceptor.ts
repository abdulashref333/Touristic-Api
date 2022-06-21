import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: number;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<IncomingMessage>();
    return next.handle().pipe(
      map((data) => ({
        status: 200,
        data,
        msg: data ? 'success' : `${request.url.split('/')[1]} Not Founded!`,
      })),
    );
  }
}
