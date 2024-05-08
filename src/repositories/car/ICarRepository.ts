import { Car } from '@prisma/client';

export interface ICarRepository {
  fetchCar(id: string): Promise<Car | null>;
  addCar(Car: Car): Promise<Car>;
  modifyCar(id: string, Car: Car): Promise<Car | null>;
  deleteCar(id: string): Promise<void | null>;
}
