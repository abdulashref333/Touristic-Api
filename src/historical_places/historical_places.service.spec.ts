import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalPlacesService } from './historical_places.service';

describe('HistoricalPlacesService', () => {
  let service: HistoricalPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricalPlacesService],
    }).compile();

    service = module.get<HistoricalPlacesService>(HistoricalPlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
