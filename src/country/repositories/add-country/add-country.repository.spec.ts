import { Test, TestingModule } from '@nestjs/testing';
import { AddCountryRepository } from './add-country.repository';

describe('AddCountryRepository', () => {
  let repository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCountryRepository],
    }).compile();

    repository = module.get<AddCountryRepository>(AddCountryRepository);
    repository.save = jest.fn();
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

  it('should be called save with correct params', async () => {
    repository.save = jest.fn().mockReturnValue(mockData);
    await repository.addCountry(mockData);
    expect(repository.save).toBeCalledWith(mockData);
  });

  it('should be throw when save throw', async () => {
    repository.save = jest.fn().mockRejectedValue(new Error());
    await expect(repository.addCountry(mockData)).rejects.toThrow();
  });
});
