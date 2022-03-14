import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import * as readline from 'readline';
import { ClientTokenService } from 'src/client-token/client-token.service';
import { ClientService } from 'src/client/client.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';
import { Readable } from 'stream';
import { EmailContent } from './model/EmailContent';

type IClient = {
  cod: string;
  email: string;
};

@Injectable()
export class SendEmailService {
  constructor(
    private readonly unsubscribesService: UnsubscribeService,
    private readonly clientService: ClientService,
    private readonly clientTokenService: ClientTokenService,
    private readonly amqpConnection: AmqpConnection, 
  ) {}
  private readonly EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  private validateEmail(email: string): boolean {
    const emailWithoutSpaces = email.replace(/ /g, '');
    return this.EMAIL_REGEX.test(emailWithoutSpaces);
  }

  private async checkUnsubscribeList(clients: IClient[]) {
    const unsubscribeList = await this.unsubscribesService.findAllUnsubscribe();
    const clientsWithoutUnsubscribe: IClient[] = [].concat(
      clients.filter((val) =>
        unsubscribeList.every((val2) => val.email !== val2.email),
      ),
    );

    return clientsWithoutUnsubscribe;
  }

  async createList(file: Express.Multer.File) {
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
      const CNPJ = clientSplit[4]; // posição do CNPJ no arquivo CSV
      const email = clientSplit[5]; // posição do email no arquivo CSV
      const clientSituation = clientSplit[6]; // posição do situação no arquivo CSV

      const isEmailValid = this.validateEmail(email);

      if (CNPJ && isEmailValid && clientSituation === 'A') {
        clientsWithValidEmail.push({
          cod,
          email,
        });
      }
    }

    const clientsWithoutUnsubscribe = await this.checkUnsubscribeList(
      clientsWithValidEmail,
    );
    await this.clientService.create(clientsWithoutUnsubscribe);

    return clientsWithoutUnsubscribe.length;
  }

  async createSend(emailContent: EmailContent) {
    const clients = await this.clientService.findAll();

    for (const client of clients) {
      let token: string;
      token = await this.clientTokenService.findToken(client.cod);
      if (!token) {
        token = await this.clientTokenService.generateToken({
          client_cod: client.cod,
          email: client.email,
        });
      }
       await this.amqpConnection.publish('exmailgo', 'routermail', {
        client,
        emailContent,
        token,
      }); 
    }
  }
}
