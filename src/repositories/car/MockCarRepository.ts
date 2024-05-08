import { Car } from '@prisma/client';
import { ICarRepository } from './ICarRepository';

export class MockCarRepository implements ICarRepository {
  private cars: Car[] = [];

  async fetchCar(id: string): Promise<Car | undefined> {
    return this.cars.find((user) => user.id === id);
  }

  async addCar(car: Car): Promise<Car> {
    this.cars.push({ ...car });
    return car;
  }

  async modifyCar(id: string, modifiedUser: Car): Promise<Car | undefined> {
    const index = this.cars.findIndex((user) => user.id === id);
    if (index === -1) return undefined;
    this.cars[index] = { ...modifiedUser };
    return this.cars[index];
  }

  async deleteCar(id: string): Promise<void> {
    const index = this.cars.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.cars.splice(index, 1);
    }
  }
}
