import { User } from './user.interface';

export type CreateUserInput = Pick<
  User,
  'roleCode' | 'fullName' | 'email' | 'phoneNumber' | 'password'
>;
