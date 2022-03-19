import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailContent } from './model/EmailContent';
import { SendEmailService } from './send-email.service';

@Controller('send')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Post('email')
  @HttpCode(HttpStatus.OK)
  async create(@Body() emailContent: EmailContent) {
    await this.sendEmailService.createSend(emailContent);
  }
}
