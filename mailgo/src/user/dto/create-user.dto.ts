import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  name: string;
  password: string;
}
