import { Module } from '@nestjs/common';
import { UnsubscribeService } from './unsubscribe.service';
import { UnsubscribeController } from './unsubscribe.controller';
import { ClientTokenService } from 'src/client-token/client-token.service';

@Module({
  controllers: [UnsubscribeController],
  providers: [UnsubscribeService, ClientTokenService],
})
export class UnsubscribeModule {}
