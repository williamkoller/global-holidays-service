import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@/config/config.service';
import { AuthModule } from '@/auth/auth.module';
import { ContinentModule } from '@/continent/continent.module';
import { CountryModule } from '@/country/country.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()[0]),
    forwardRef(() => AuthModule),
    forwardRef(() => ContinentModule),
    forwardRef(() => CountryModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
