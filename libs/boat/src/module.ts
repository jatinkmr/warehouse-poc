import { Global, Module } from '@nestjs/common';
import config from '@config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { BaseValidator } from './validator';
import { CacheModule } from '@squareboat/nest-cache';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("cache"),
      inject: [ConfigService],
    })
  ],
  providers: [BaseValidator],
  exports: [BaseValidator],
})
export class BoatModule { }
