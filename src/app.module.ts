import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@/config/config.service';
import { ContinentModule } from '@/continent/continent.module';
import { CountryModule } from '@/country/country.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]),
    forwardRef(() => ContinentModule),
    forwardRef(() => CountryModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
