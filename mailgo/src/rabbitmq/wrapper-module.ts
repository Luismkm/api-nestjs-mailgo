import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

 @Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: `amqp://admin:admin@rabbitmq:5672`,
      exchanges: [
        {
          name: 'exmailgo',
          type: 'direct',
        },
      ],
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class WrapperModule {}
