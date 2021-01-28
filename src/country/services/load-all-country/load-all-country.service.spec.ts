import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoadAllCountryRepository } from '@/country/repositories/export';
import { LoadAllCountryService } from '@/country/services/export';

describe('LoadAllCountryService', () => {
  let service: LoadAllCountryService;
  let repository: LoadAllCountryRepository;

  beforeEach(async () => {
    const loadAllCountryServiceMock = {
      loadAllCountry: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoadAllCountryService,
        {
          provide: LoadAllCountryRepository,
          useFactory: () => loadAllCountryServiceMock,
        },
      ],
    }).compile();

    service = module.get<LoadAllCountryService>(LoadAllCountryService);
    repository = module.get<LoadAllCountryRepository>(LoadAllCountryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loadAllCountry', () => {
    it('should be throw if repository throw', async () => {
      (repository.loadAllCountry as jest.Mock).mockRejectedValue(new InternalServerErrorException());
      await expect(service.loadAllCountry()).rejects.toThrow(new InternalServerErrorException());
    });
  });
});
