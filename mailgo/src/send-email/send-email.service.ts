import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ClientTokenService } from 'src/client-token/client-token.service';
import { ClientService } from 'src/client/client.service';
import { EmailContent } from './model/EmailContent';

@Injectable()
export class SendEmailService {
  constructor(
    private readonly clientService: ClientService,
    private readonly clientTokenService: ClientTokenService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async createSend(emailContent: EmailContent) {
    const clients = await this.clientService.findAll();

    for (const client of clients) {
      let token: string;
      token = await this.clientTokenService.findTokenByClientCod(client.cod);
      if (!token) {
        token = await this.clientTokenService.generateToken({
          client_cod: client.cod,
          email: client.email,
        });
      }
      await this.amqpConnection.publish('exchange-mailgo', 'routermail', {
        client,
        emailContent,
        token,
      });
    }
  }
}
