import * as readline from 'readline';
import { Readable } from 'stream';
import { IClient } from '../model/client-interface';
import { validateEmail } from './validate-email';

export const handleReadCSV = async (
  file: Express.Multer.File,
): Promise<IClient[]> => {
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const clients = readline.createInterface({
    input: readableFile,
  });

  const clientsWithValidEmail: IClient[] = [];

  for await (const line of clients) {
    const clientSplit = line.split(';');

    const cod = clientSplit[0]; // posição do cod_client no arquivo CSV
    const CNPJ = clientSplit[2]; // posição do CNPJ no arquivo CSV
    const email = clientSplit[3]; // posição do email no arquivo CSV
    const clientSituation = clientSplit[4]; // posição do situação no arquivo CSV A = Ativo B = Baixado

    const validedEmail = validateEmail(email);

    if (CNPJ && validedEmail && clientSituation === 'A') {
      clientsWithValidEmail.push({
        cod,
        email: validedEmail,
      });
    }
  }
  return clientsWithValidEmail;
};
