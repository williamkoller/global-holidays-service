import { Test, TestingModule } from '@nestjs/testing';
import { CountryRepository } from './country.repository';

describe('CountryRepository', () => {
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryRepository],
    }).compile();

    repository = module.get<CountryRepository>(CountryRepository);
    repository.find = jest.fn();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getAllCountry', () => {
    it('should be find with correct params', async () => {
      repository.find = jest.fn().mockReturnValue({});
      await repository.getAllCountry();
      expect(repository.find).toBeCalledWith();
    });
  });
});
