import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ClientTokenModule } from 'src/client-token/client-token.module';
import { ClientModule } from 'src/client/client.module';
import { UnsubscribeModule } from 'src/unsubscribe/unsubscribe.module';
import { SendEmailController } from './send-email.controller';
import { SendEmailService } from './send-email.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: `amqp://admin:admin@rabbitmq:5672`,
      exchanges: [
        {
          name: 'exchange-mailgo',
          type: 'direct',
        },
      ],
    }),
    ClientTokenModule,
    UnsubscribeModule,
    ClientModule,
  ],
  controllers: [SendEmailController],
  providers: [SendEmailService],
})
export class SendEmailModule {}
