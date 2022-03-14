import { Prisma } from '@prisma/client';

export class Client implements Prisma.ClientUncheckedCreateInput {
  cod: string;
  email: string;
  sended: string;
}
