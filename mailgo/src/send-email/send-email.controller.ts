import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailContent } from './model/EmailContent';
import { SendEmailService } from './send-email.service';

@Controller('send')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}
  @Post('email')
  async create(@Body() emailContent: EmailContent) {
    await this.sendEmailService.createSend(emailContent);
  }

  @Post('create/list')
  @UseInterceptors(FileInterceptor('file'))
  async createList(@UploadedFile() file: Express.Multer.File) {
    this.sendEmailService.createList(file);
  }
}
