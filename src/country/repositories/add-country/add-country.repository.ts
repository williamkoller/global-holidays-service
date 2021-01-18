import { Country } from '../../../entities/country.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCountryDto } from '../../dtos/create-country.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';

@EntityRepository(Country)
export class AddCountryRepository extends Repository<Country> {
  async addCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    try {
      await validateOrReject(createCountryDto);
      return await this.save(createCountryDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
