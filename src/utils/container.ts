import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../repositories/user/UserRepository';
import { IUserRepository } from '../repositories/user/IUserRepository';
import { UserService } from '../services/UserService';
import { ICarRepository } from '../repositories/car/ICarRepository';
import { CarRepository } from '../repositories/car/CarRepository';
import { CarService } from '../services/CarService';

const prismaClient = new PrismaClient();

container.register<IUserRepository>('UserRepository', UserRepository);
container.register<ICarRepository>('CarRepository', CarRepository);

container.register('UserService', { useClass: UserService });
container.register('CarSerUvice', { useClass: CarService });

container.registerInstance<PrismaClient>('PrismaClient', prismaClient);
