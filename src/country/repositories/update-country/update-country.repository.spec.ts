import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCountryRepository } from './update-country.repository';

describe('UpdateCountryRepository', () => {
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCountryRepository],
    }).compile();

    repository = module.get<UpdateCountryRepository>(UpdateCountryRepository);
  });
  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });
});
