import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(client: Prisma.ClientTokenCreateInput) {
    const data = {
      data: client,
    };
    const clientToken = await this.prisma.clientToken.create(data);
    return clientToken.token;
  }

  async findToken(client_cod: string) {
    const clientToken = await this.prisma.clientToken.findFirst({
      where: { client_cod },
    });
    return clientToken ? clientToken.token : null;
  }
}
