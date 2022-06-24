import { Test, TestingModule } from '@nestjs/testing';
import { ResturantController } from './resturant.controller';

describe('ResturantController', () => {
  let controller: ResturantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResturantController],
    }).compile();

    controller = module.get<ResturantController>(ResturantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
