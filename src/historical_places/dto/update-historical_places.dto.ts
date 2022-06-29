import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricalPlaceDto } from './create-historical_places.dto';


export class UpdateHistoricalPlacesDto extends PartialType(CreateHistoricalPlaceDto) {}
