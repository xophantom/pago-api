import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async fetchUser(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async addUser(user: User): Promise<User> {
    return await this.prisma.user.create({ data: { ...user } });
  }

  async modifyUser(id: string, user: User): Promise<User | null> {
    if (!(await this.fetchUser(id))) {
      return null;
    }
    return await this.prisma.user.update({ where: { id }, data: { ...user } });
  }

  async removeUser(id: string): Promise<void | null> {
    if (!(await this.fetchUser(id))) {
      return null;
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
