import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getSentryConfig() {
    const environment = this.getValue('SENTRY_ENV', false) || 'LOCALHOST';
    const dsn = this.getValue('SENTRY_DSN', false);
    const bucketName = this.getValue('BUCKET', false);
    const bucketRegion = this.getValue('AWS_REGION', false);
    return { environment, dsn, bucketName, bucketRegion };
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEVELOP';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions[] {
    return [
      {
        type: 'postgres',
        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT'), 0),
        username: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        database: this.getValue('POSTGRES_DATABASE'),
        synchronize: false,
        migrationsRun: true,
        cache: true,
        logging: JSON.parse(this.getValue('LOGGING')),
        autoLoadEntities: true,
        migrationsTableName: 'migration',
        cli: {
          migrationsDir: 'src/migration',
        },
        retryAttempts: 3,
        retryDelay: 3000,
        keepConnectionAlive: true,
        connectTimeoutMS: 15000,
      },
      {
        name: 'seed',
        type: 'postgres',
        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT'), 0),
        username: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        database: this.getValue('POSTGRES_DATABASE'),
        logging: JSON.parse(this.getValue('LOGGING')),
        migrationsTableName: 'seeds',
        migrations: [`${__dirname}/../seeds/${this.getValue('MODE')}/**/*{.ts,.js}`],
        cli: {
          migrationsDir: `src/seeds/${this.getValue('MODE')}`,
        },
        retryAttempts: 3,
        retryDelay: 3000,
        keepConnectionAlive: false,
      },
    ];
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
