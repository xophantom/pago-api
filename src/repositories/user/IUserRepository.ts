import { User } from '@prisma/client';

export interface IUserRepository {
  fetchUser(id: string): Promise<User | null>;
  addUser(user: User): Promise<User>;
  modifyUser(id: string, user: User): Promise<User | null>;
  removeUser(id: string): Promise<void | null>;
}
