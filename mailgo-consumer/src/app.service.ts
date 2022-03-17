import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { MailData } from './mail/model/MailData';

@Injectable()
export class AppService {
  constructor(private mailService: MailService) {}
  @RabbitRPC({
    exchange: process.env.RABBITMQ_EXCHANGE,
    routingKey: process.env.RABBITMQ_ROUTER_KEY,
    queue: 'queue-mail',
  })
  public async rpcHandler(msgQueue: MailData) {
    await this.mailService.sendUserConfirmation(msgQueue);
  }
}
