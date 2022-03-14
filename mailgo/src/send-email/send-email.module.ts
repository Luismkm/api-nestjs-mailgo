import { Module } from '@nestjs/common';
import { ClientTokenService } from 'src/client-token/client-token.service';
import { ClientService } from 'src/client/client.service';
import { WrapperModule } from 'src/rabbitmq/wrapper-module';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';
import { SendEmailController } from './send-email.controller';
import { SendEmailService } from './send-email.service';

@Module({
  imports: [WrapperModule],
  controllers: [SendEmailController],
  providers: [
    SendEmailService,
    UnsubscribeService,
    ClientService,
    ClientTokenService,
  ],
})
export class SendEmailModule {}
