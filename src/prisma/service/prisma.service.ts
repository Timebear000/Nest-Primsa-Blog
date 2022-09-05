import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  logger: Logger = new Logger('Prisma Service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Primsa Data Base Connection');
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
