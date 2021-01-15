import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CountryRepository } from './country.repository';

describe('CountryRepository', () => {
  let repository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryRepository],
    }).compile();

    repository = module.get<CountryRepository>(CountryRepository);
    repository.find = jest.fn();
    mockData = [
      {
        name: 'Brazil',
        capitalContry: 'Brasilia',
        territorialExtension: 8510295914,
        localization: 'South America',
        language: 'Portuguese',
        currency: 'Real',
        continent: 'Latin America',
      },
    ];
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

    it('should be throw find returns empty', async () => {
      repository.find = jest.fn().mockReturnValue(undefined);
      await expect(repository.getAllCountry({})).rejects.toThrow(new NotFoundException('There is no record'));
    });

    it('should be returns when find returns', async () => {
      repository.find = jest.fn().mockReturnValue(mockData);
      expect(await repository.getAllCountry()).toEqual(mockData);
    });
  });
});
