import { Test, TestingModule } from '@nestjs/testing';
import { ContinentController } from './continent.controller';

describe('ContinentController', () => {
  let controller: ContinentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinentController],
    }).compile();

    controller = module.get<ContinentController>(ContinentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
