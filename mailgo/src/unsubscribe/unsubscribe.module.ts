import { Module } from '@nestjs/common';
import { UnsubscribeService } from './unsubscribe.service';
import { UnsubscribeController } from './unsubscribe.controller';

@Module({
  controllers: [UnsubscribeController],
  providers: [UnsubscribeService],
})
export class UnsubscribeModule {}
