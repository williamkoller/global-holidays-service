import { Test, TestingModule } from '@nestjs/testing';
import { AddCountryRepository } from './add-country.repository';
import { Country } from '../../../entities/country.entity';
import { Continent } from '../../../entities/continent.entity';
import { InternalServerErrorException } from '@nestjs/common';

describe('AddCountryRepository', () => {
  let repository;
  let mockData;
  let mockError;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCountryRepository],
    }).compile();

    repository = module.get<AddCountryRepository>(AddCountryRepository);
    mockData = {
      name: 'Brazil',
      capitalContry: 'Brasilia',
      territorialExtension: 854100,
      localization: 'South America',
      language: 'Portuguese',
      currency: 'Real',
      continent: new Continent(),
    } as Country;
    mockError = {
      name: 'INVALID',
      continent: new Continent(),
      language: 'INVALID',
      currency: 'INVALID',
      localization: 'INVALID',
      territorialExtension: undefined,
      capitalContry: 'INVALID',
    } as Country;
    repository.save = jest.fn();
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should be called save with correct params', async () => {
    repository.save = jest.fn().mockReturnValue(mockData);
    await repository.addCountry(mockData);
    expect(repository.save).toBeCalledWith(mockData);
  });

  it('should be throw when save throw', async () => {
    repository.save = jest.fn().mockRejectedValue(new Error());
    await expect(repository.addCountry(mockData)).rejects.toThrow();
  });

  it('should be throw if called with invalid params', async () => {
    (repository.save as jest.Mock).mockRejectedValue(new InternalServerErrorException());
    await expect(repository.addCountry(mockError)).rejects.toThrow(new InternalServerErrorException());
  });
});
