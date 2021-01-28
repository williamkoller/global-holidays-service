import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Continent } from '@/entities/continent.entity';
import { Country } from '@/entities/country.entity';
import { AddCountryRepository } from '@/country/repositories/export';
import { AddCountryService } from '@/country/services/export';

describe('AddCountryService', () => {
  let service: AddCountryService;
  let repository: AddCountryRepository;
  let mockData;

  beforeEach(async () => {
    const addAllCountryServiceMock = {
      addCountry: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddCountryService,
        {
          provide: AddCountryRepository,
          useFactory: () => addAllCountryServiceMock,
        },
      ],
    }).compile();

    service = module.get<AddCountryService>(AddCountryService);
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('AddCountryService', () => {
    it('should be throw if repository throw', async () => {
      (repository.addCountry as jest.Mock).mockRejectedValue(new InternalServerErrorException());
      await expect(service.addCountry(mockData)).rejects.toThrow(new InternalServerErrorException());
    });
  });
});
