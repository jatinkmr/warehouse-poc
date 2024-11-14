import { Module } from '@nestjs/common';
import { EventModule } from '@squareboat/nest-events';
import { UserModule } from './user';
import { BoatModule } from '@libs/boat';
import { ConsoleModule } from '@squareboat/nest-console';
// import { ObjectionModule } from '@squareboat/nestjs-objection';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalizationModule } from '@squareboat/nestjs-localization';
import { RootController } from './controller';
import { ShipRelayModule } from './shiprelay/module';
import { QueueModule } from '@squareboat/nest-queue';
import { RedisQueueDriver } from '@squareboat/nest-queue-redis';
import { MintSoftModule } from './mintsoft/module';

@Module({
  imports: [
    // ObjectionModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: (config: ConfigService) => config.get('db'),
    //   inject: [ConfigService],
    // }),
    LocalizationModule.register({
      path: 'resources/lang',
      fallbackLang: 'en',
    }),
    QueueModule.register({
      isGlobal: true,
      default: 'notifications',
      connections: {
        notifications: {
          driver: RedisQueueDriver,
          queue: 'MyQueue',
          host: 'localhost',
          port: 6379,
          database: 0,
        },
      },
    }),
    BoatModule,
    UserModule,
    EventModule,
    ConsoleModule,
    ShipRelayModule,
    MintSoftModule
  ],
  controllers: [RootController],
  providers: [],
})
export class AppModule { }
