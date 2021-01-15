import { Test, TestingModule } from '@nestjs/testing';
import { ContinentService } from './continent.service';

describe('ContinentService', () => {
  let service: ContinentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContinentService],
    }).compile();

    service = module.get<ContinentService>(ContinentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
