import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoadAllCountryRepository } from './load-all-country.repository';

describe('LoadAllCountryRepository', () => {
  let repository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadAllCountryRepository],
    }).compile();

    repository = module.get<LoadAllCountryRepository>(LoadAllCountryRepository);
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
      await repository.loadAllCountry();
      expect(repository.find).toBeCalledWith();
    });

    it('should be throw find returns empty', async () => {
      repository.find = jest.fn().mockReturnValue(undefined);
      await expect(repository.loadAllCountry({})).rejects.toThrow(new NotFoundException('There is no record'));
    });

    it('should be returns when find returns', async () => {
      repository.find = jest.fn().mockReturnValue(mockData);
      expect(await repository.loadAllCountry()).toEqual(mockData);
    });
  });
});
