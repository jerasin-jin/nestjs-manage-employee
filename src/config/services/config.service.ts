import { Injectable, NotImplementedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
import { EnvConfig } from '../interfaces';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import * as typeorm from 'typeorm';

export declare type SupportedDbConnectionOption =
  | MysqlConnectionOptions
  | PostgresConnectionOptions
  | SqliteConnectionOptions
  | SqlServerConnectionOptions;

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  constructor(filePath: string) {
    try {
      const config = dotenv.parse(fs.readFileSync(filePath));
      this.envConfig = this.validateEnvInput({ ...process.env, ...config });
    } catch (error) {
      throw error;
    }
  }

  public get jwt_secret(): string {
    return this.envConfig.JWT_SECRET;
  }

  public get expire_in(): string {
    return this.envConfig.EXPIRE_IN;
  }

  private validateEnvInput(envConfig: Record<string, any>): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      JWT_SECRET: Joi.string().required(),
      EXPIRE_IN: Joi.string().default('60s'),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
      { stripUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
