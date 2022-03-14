import { Controller, Get } from '@nestjs/common';
import { UnsubscribeService } from './unsubscribe.service';

@Controller('unsubscribe')
export class UnsubscribeController {
  constructor(private readonly unsubscribeService: UnsubscribeService) {}

  @Get()
  findAll() {
    return this.unsubscribeService.findAllUnsubscribe();
  }
}
