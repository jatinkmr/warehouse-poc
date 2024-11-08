import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ServerOptions } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { RequestGuard } from './guards';
import { ExceptionFilter } from '../exceptions';

export class RestServer {
  private module: any;
  private options: ServerOptions;

  /**
   * Create instance of fastify lambda server
   * @returns Promise<INestApplication>
   */

  static async make(module: any, options?: ServerOptions): Promise<void> {
    const app = await NestFactory.create(module);

    if (options?.addValidationContainer) {
      useContainer(app.select(module), { fallbackOnErrors: true });
    }

    app.enableCors({ origin: true });

    app.useGlobalGuards(new RequestGuard());
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));
    options.globalPrefix && app.setGlobalPrefix(options.globalPrefix);

    app.setGlobalPrefix('api');

    const config = app.get(ConfigService, { strict: false });

    let PORT = options.port || config.get<number>('app.port');
    await app.listen(PORT, () => console.log(`server is listening at ${PORT}! and the url is ${process.env.APP_URL}`));
  }
}
