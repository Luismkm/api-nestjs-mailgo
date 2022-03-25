import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';
import { handleReadCSV } from './utils/handle-read-csv';

import { IClient } from './model/client-interface';

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly unsubscribesService: UnsubscribeService,
  ) {}

  private async checkUnsubscribeList(clients: IClient[]) {
    const unsubscribeList = await this.unsubscribesService.findAllUnsubscribe();

    if (unsubscribeList) {
      const clientsWithoutUnsubscribe: IClient[] = [].concat(
        clients.filter((val) =>
          unsubscribeList.every((val2) => val.email !== val2.email),
        ),
      );
      return clientsWithoutUnsubscribe;
    }
    return clients;
  }

  async create(file: Express.Multer.File) {
    const clientsWithValidEmail = await handleReadCSV(file);

    const clientsWithoutUnsubscribe = await this.checkUnsubscribeList(
      clientsWithValidEmail,
    );

    await this.prisma.client.createMany({
      data: clientsWithoutUnsubscribe,
    });
  }

  async findAll() {
    return await this.prisma.client.findMany({
      select: {
        cod: true,
        email: true,
      },
    });
  }

  async delete() {
    return await this.prisma.client.deleteMany();
  }
}
