import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '@/country/dtos/create-country.dto';
import { Country } from '@/entities/country.entity';
import { AddCountryRepository } from '@/country/repositories/export';

@Injectable()
export class AddCountryService {
  constructor(private readonly addCountryRepository: AddCountryRepository) {}

  async addCountry(data: CreateCountryDto): Promise<Country> {
    return await this.addCountryRepository.addCountry(data);
  }
}
