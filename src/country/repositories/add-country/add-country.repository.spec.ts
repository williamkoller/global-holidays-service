import { Test, TestingModule } from '@nestjs/testing';
import { AddCountryRepository } from '@/country/repositories/add-country/add-country.repository';
import { Country } from '@/entities/country.entity';
import { Continent } from '@/entities/continent.entity';

describe('AddCountryRepository', () => {
  let repository;
  let mockData;

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

  it('should be returns created data', async () => {
    (repository.save as jest.Mock).mockReturnValue(mockData);
    expect(await repository.addCountry(mockData)).toEqual(mockData);
  });
});
