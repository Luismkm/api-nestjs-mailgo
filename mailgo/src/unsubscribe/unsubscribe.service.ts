import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Unsubscribe } from './entities/unsubscribe.entity';

@Injectable()
export class UnsubscribeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUnsubscribe(): Promise<Unsubscribe[]> {
    return await this.prisma.unsubscribe.findMany();
  }
}
