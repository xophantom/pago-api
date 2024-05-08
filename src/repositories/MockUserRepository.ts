import { User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async fetchUser(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async addUser(user: User): Promise<User> {
    this.users.push({ ...user });
    return user;
  }

  async modifyUser(id: string, modifiedUser: User): Promise<User | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...modifiedUser };
    return this.users[index];
  }

  async removeUser(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
