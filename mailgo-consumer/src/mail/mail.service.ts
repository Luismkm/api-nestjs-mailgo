import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailData } from './model/MailData';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async handleSendEmail(content: MailData) {
    try {
      await this.mailerService.sendMail({
        to: content.client.email,
        // from: '"Support Team" <support@example.com>', // override default from ( in mail.module.ts)
        subject: content.emailContent.emailSubject,
        template: '../email-content',
        context: {
          linkImg: content.emailContent.linkImgBanner,
          linkUnsubscribe: `https://mailgo.com.br/unsubscribe/${content.token}`,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
