import { Prisma } from '@prisma/client';

export class Unsubscribe implements Prisma.UnsubscribeUncheckedCreateInput {
  cod: string;
  email: string;
  created_at?: string | Date;
}
