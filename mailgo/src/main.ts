import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestInterceptor } from './interceptors/badRequest.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new BadRequestInterceptor());

  await app.listen(3000);
}
bootstrap();
