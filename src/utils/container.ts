import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../repositories/UserRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserService } from '../services/UserService';

const prismaClient = new PrismaClient();

container.register<IUserRepository>('UserRepository', UserRepository);
container.register('UserService', { useClass: UserService });
container.registerInstance<PrismaClient>('PrismaClient', prismaClient);
