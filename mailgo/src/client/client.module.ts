import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientTokenModule } from 'src/client-token/client-token.module';
import { UnsubscribeModule } from 'src/unsubscribe/unsubscribe.module';

@Module({
  imports: [ClientTokenModule, UnsubscribeModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
