import { Injectable } from '@nestjs/common';
import { ClientTokenService } from 'src/client-token/client-token.service';
import { BadRequestError } from 'src/errors/BadRequestError';
import { PrismaService } from 'src/prisma/prisma.service';
import { Unsubscribe } from './entities/unsubscribe.entity';

@Injectable()
export class UnsubscribeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientToken: ClientTokenService,
  ) {}

  async findAllUnsubscribe(): Promise<Unsubscribe[]> {
    return await this.prisma.unsubscribe.findMany();
  }

  async addInUnsubscribeList(token: string) {
    const UUID_REGEX =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const isUuid = UUID_REGEX.test(token);
    if (isUuid) {
      const client = await this.clientToken.findTokenByToken(token);
      if (client) {
        const alreadyAdded = await this.prisma.unsubscribe.findUnique({
          where: { cod: client.client_cod },
        });

        if (!alreadyAdded) {
          return await this.prisma.unsubscribe.create({
            data: {
              cod: client.client_cod,
              email: client.email,
            },
          });
        }
        return;
      }
    }
    throw new BadRequestError('Invalid token');
  }
}
