import { Module } from '@nestjs/common';
import { QueryService } from './query/query.service';

@Module({
  providers: [QueryService],
  exports: [QueryService],
})
export class CommonModule {}
