import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: Prisma.ClientCreateManyInput[]) {
    const data = {
      data: createClientDto,
    };
    return await this.prisma.client.createMany(data);
  }

  async findAll() {
    return await this.prisma.client.findMany({
      select: {
        cod: true,
        email: true,
      },
    });
  }
}
