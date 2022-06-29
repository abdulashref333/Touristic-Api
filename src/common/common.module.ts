import { Module } from '@nestjs/common';
import { QueryService } from './query/query.service';
import { UtilsService } from './utils/utils.service';

@Module({
  providers: [QueryService, UtilsService],
  exports: [QueryService, UtilsService],
})
export class CommonModule {}
