import { Test, TestingModule } from '@nestjs/testing';
import { CreateCountryRepository } from './create-country.repository';

describe('CreateCountryRepository', () => {
  let repository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCountryRepository],
    }).compile();

    repository = module.get<CreateCountryRepository>(CreateCountryRepository);
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
    await repository.createCountry(mockData);
    expect(repository.save).toBeCalledWith(mockData);
  });
});
