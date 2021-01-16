import { Test, TestingModule } from '@nestjs/testing';
import { CreateCountryRepository } from './create-country.repository';

describe('CreateCountryRepository', () => {
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCountryRepository],
    }).compile();

    repository = module.get<CreateCountryRepository>(CreateCountryRepository);
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
