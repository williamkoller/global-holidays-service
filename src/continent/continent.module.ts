import { forwardRef, Module } from '@nestjs/common';
import { ContinentService } from './services/continent.service';
import { ContinentController } from './controllers/continent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Continent } from 'src/entities/continent.entity';
import { ContinentRepository } from './repositories/continent.repository';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([Continent]), forwardRef(() => CountryModule)],
  providers: [ContinentService, ContinentRepository],
  controllers: [ContinentController],
})
export class ContinentModule {}
