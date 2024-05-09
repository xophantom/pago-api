import 'reflect-metadata';
import { MockCarRepository } from '../repositories/car/MockCarRepository';
import { Car } from '@prisma/client';
import ResultHandler from '../utils/responses';
import { CarService } from '../services/CarService';
import { MockUserRepository } from '../repositories/user/MockUserRepository';

const car: Car = {
  id: 'qwewe',
  model: 'Toyota Corolla',
  year: 2022,
  ownerId: '3297a5ab-54e5-43bf-84e2-b0ebdb1b45e6',
  created_at: new Date(),
  updated_at: null,
};

const incorrectCar = {
  id: '1',
  model: 1111,
  year: 2022,
  ownerId: 123,
  created_at: new Date(),
  updated_at: null,
};

const responseOn = new ResultHandler();

describe('CarService', () => {
  const carRepository = new MockCarRepository();
  const userRepository = new MockUserRepository();
  const carService = new CarService(carRepository, userRepository);

  describe('addCar', () => {
    it('should create a new car', async () => {
      const addedCar = await carService.addCar(car);
      expect(addedCar).toEqual(responseOn.created<Car, null>(car, null));
    });

    it('should return an error if the payload is incorrect during creation', async () => {
      const addedCar = await carService.addCar(incorrectCar as unknown as Car);

      expect([400, 404]).toContain(addedCar.status);
      expect(addedCar.error).toBeDefined();
      expect(addedCar.data).toBeNull();
    });
  });

  describe('fetchCar', () => {
    it('should return a car by id', async () => {
      await carService.addCar(car);
      const foundCar = await carService.fetchCar(car.id);
      expect(foundCar).toEqual(
        responseOn.success<Car, null>(foundCar.data, null),
      );
    });

    it('should return an error if it cannot locate the car', async () => {
      await carService.addCar(car);
      const foundCar = await carService.fetchCar('nonexistent-id');
      expect(foundCar).toEqual(
        responseOn.notFound<null, string>(foundCar.error as unknown as string),
      );
    });
  });

  describe('modifyCar', () => {
    it('should return the updated car', async () => {
      const addedCar = await carService.addCar(car);
      if (!addedCar.data) return;
      const updatedCar: Car = {
        ...addedCar.data,
        model: 'Test Updated Car',
        updated_at: new Date(),
      };

      const result = await carService.modifyCar(updatedCar);
      expect(result).toEqual(responseOn.success<Car, null>(result.data, null));
    });

    it('should return an error if the payload is incorrect during updated', async () => {
      const updateCar = await carService.modifyCar(
        incorrectCar as unknown as Car,
      );
      expect(updateCar).toEqual(
        responseOn.badRequest<null, string[]>(
          updateCar.error as unknown as string[],
        ),
      );
    });
  });

  describe('deleteCar', () => {
    it('should delete a car', async () => {
      await carService.addCar(car);
      const deleteCar = await carService.deleteCar(car.id);
      expect(deleteCar).toEqual(
        responseOn.success<string, null>(deleteCar.data, null),
      );
    });

    it('should return an error when attempting to delete as it cannot locate the car', async () => {
      await carService.addCar(car);
      const deleteCar = await carService.deleteCar('nonexistent-id');
      expect(deleteCar).toEqual(
        responseOn.notFound<null, string>(deleteCar.error as unknown as string),
      );
    });
  });
});
