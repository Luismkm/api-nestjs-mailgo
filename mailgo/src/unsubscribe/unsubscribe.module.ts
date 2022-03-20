import { Module } from '@nestjs/common';
import { UnsubscribeService } from './unsubscribe.service';
import { UnsubscribeController } from './unsubscribe.controller';
import { ClientTokenModule } from 'src/client-token/client-token.module';

@Module({
  imports: [ClientTokenModule],
  controllers: [UnsubscribeController],
  providers: [UnsubscribeService],
  exports: [UnsubscribeService],
})
export class UnsubscribeModule {}
