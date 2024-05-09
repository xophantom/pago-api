import { User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';

export class MockUserRepository implements IUserRepository {
  public users: User[] = [];

  fetchUser = jest.fn((id: string): Promise<User | undefined> => {
    return Promise.resolve(this.users.find((user) => user.id === id));
  });

  addUser = jest.fn((user: User): Promise<User> => {
    this.users.push({ ...user });
    return Promise.resolve(user);
  });

  modifyUser = jest.fn(
    (id: string, modifiedUser: User): Promise<User | undefined> => {
      const index = this.users.findIndex((user) => user.id === id);
      if (index === -1) return Promise.resolve(undefined);
      this.users[index] = { ...modifiedUser };
      return Promise.resolve(this.users[index]);
    },
  );

  removeUser = jest.fn((id: string): Promise<void> => {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return Promise.resolve();
  });

  clearUsers = (): void => {
    this.users = [];
  };
}
