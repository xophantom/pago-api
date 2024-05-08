import { Car, PrismaClient } from '@prisma/client';
import { ICarRepository } from './ICarRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CarRepository implements ICarRepository {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async fetchCar(id: string): Promise<Car | null> {
    return await this.prisma.car.findUnique({ where: { id } });
  }

  async addCar(car: Car): Promise<Car> {
    return await this.prisma.car.create({ data: { ...car } });
  }

  async modifyCar(id: string, car: Car): Promise<Car | null> {
    if (!(await this.fetchCar(id))) {
      return null;
    }
    return await this.prisma.car.update({ where: { id }, data: { ...car } });
  }

  async deleteCar(id: string): Promise<void | null> {
    if (!(await this.fetchCar(id))) {
      return null;
    }
    await this.prisma.car.delete({ where: { id } });
  }
}
