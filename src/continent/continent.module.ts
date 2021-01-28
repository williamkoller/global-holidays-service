import { forwardRef, Module } from '@nestjs/common';
import { ContinentService } from '@/continent/services/continent.service';
import { ContinentController } from '@/continent/controllers/continent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Continent } from '@/entities/continent.entity';
import { ContinentRepository } from '@/continent/repositories/continent.repository';
import { CountryModule } from '@/country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([Continent]), forwardRef(() => CountryModule)],
  providers: [ContinentService, ContinentRepository],
  controllers: [ContinentController],
})
export class ContinentModule {}
