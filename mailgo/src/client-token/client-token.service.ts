import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async generateToken(client: Prisma.ClientTokenCreateInput) {
    const clientToken = await this.prisma.clientToken.create({
      data: client,
    });
    return clientToken.token;
  }

  async findTokenByClientCod(client_cod: string) {
    const clientToken = await this.prisma.clientToken.findFirst({
      where: { client_cod },
    });
    return clientToken ? clientToken.token : null;
  }

  async findTokenByToken(token: string) {
    const client = await this.prisma.clientToken.findUnique({
      where: { token },
      select: {
        client_cod: true,
        email: true,
      },
    });
    return client;
  }
}
