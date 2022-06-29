import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalPlacesController } from './historical_places.controller';

describe('HistoricalPlacesController', () => {
  let controller: HistoricalPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalPlacesController],
    }).compile();

    controller = module.get<HistoricalPlacesController>(HistoricalPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
