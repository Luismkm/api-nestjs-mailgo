import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientTokenService } from 'src/client-token/client-token.service';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ClientTokenService, UnsubscribeService],
})
export class ClientModule {}
