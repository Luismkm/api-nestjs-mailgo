import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';
import * as readline from 'readline';
import { Readable } from 'stream';

type IClient = {
  cod: string;
  email: string;
};

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly unsubscribesService: UnsubscribeService,
  ) {}

  private readonly EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  private validateEmail(email: string) {
    const emailWithoutSpaces = email.replace(/ /g, ''); // remove espaços
    if (this.EMAIL_REGEX.test(emailWithoutSpaces)) {
      return emailWithoutSpaces;
    }
  }

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
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const clients = readline.createInterface({
      input: readableFile,
    });

    const clientsWithValidEmail: IClient[] = [];

    for await (const line of clients) {
      const clientSplit = line.split(';');

      const cod = clientSplit[0]; // posição do cod_client no arquivo CSV
      const CNPJ = clientSplit[2]; // posição do CNPJ no arquivo CSV
      const email = clientSplit[3]; // posição do email no arquivo CSV
      const clientSituation = clientSplit[4]; // posição do situação no arquivo CSV A = Ativo B = Baixado

      const validedEmail = this.validateEmail(email);

      if (CNPJ && validedEmail && clientSituation === 'A') {
        clientsWithValidEmail.push({
          cod,
          email: validedEmail,
        });
      }
    }
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
