import { Module } from '@nestjs/common';
import { ClientTokenService } from './client-token.service';

@Module({
  providers: [ClientTokenService],
  exports: [ClientTokenService],
})
export class ClientTokenModule {}
