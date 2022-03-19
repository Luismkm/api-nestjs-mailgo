import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { UnsubscribeService } from './unsubscribe.service';

@Controller('unsubscribe')
export class UnsubscribeController {
  constructor(private readonly unsubscribeService: UnsubscribeService) {}

  @Public()
  @Get(':token')
  async addClientInUnsubscribeList(@Param('token') token: string) {
    await this.unsubscribeService.addInUnsubscribeList(token);
  }
}
