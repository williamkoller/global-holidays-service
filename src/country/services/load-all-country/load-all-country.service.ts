import { Injectable } from '@nestjs/common';
import { Country } from 'src/entities/country.entity';
import { LoadAllCountryRepository } from '../../../country/repositories/export';

@Injectable()
export class LoadAllCountryService {
  constructor(private readonly loadAllCountryRepository: LoadAllCountryRepository) {}

  async loadAllCountry(): Promise<Country[]> {
    return await this.loadAllCountryRepository.loadAllCountry();
  }
}
