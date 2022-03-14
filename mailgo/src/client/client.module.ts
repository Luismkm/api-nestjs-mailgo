import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientTokenService } from 'src/client-token/client-token.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ClientTokenService],
})
export class ClientModule {}
