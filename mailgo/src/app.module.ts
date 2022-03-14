import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SendEmailModule } from './send-email/send-email.module';
import { UnsubscribeModule } from './unsubscribe/unsubscribe.module';
import { ClientModule } from './client/client.module';
import { ClientTokenService } from './client-token/client-token.service';
import { ClientTokenModule } from './client-token/client-token.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    SendEmailModule,
    UnsubscribeModule,
    ClientModule,
    ClientTokenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
