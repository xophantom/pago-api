import { Car } from '@prisma/client';
import * as yup from 'yup';
import { ICarRepository } from '../repositories/car/ICarRepository';
import { ErrorsTypes } from '../types/error';
import { validateCar } from '../validations/carValidation';
import { inject, injectable } from 'tsyringe';
import ResultHandler from '../utils/responses';
import { ResultHandlerType } from '../types/response_type';
import { IUserRepository } from '../repositories/user/IUserRepository';

@injectable()
export class CarService {
  private response = new ResultHandler();
  private validation = validateCar;

  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async addCar(car: Car): Promise<ResultHandlerType<Car, ErrorsTypes>> {
    try {
      const userExists = await this.userRepository.fetchUser(car.ownerId);
      if (!userExists) {
        return this.response.notFound<null, string>('User not found.');
      }
      const newCar = await this.carRepository.addCar(car);
      return this.response.created<Car, null>(newCar, null);
    } catch (error) {
      return this.response.error(error);
    }
  }

  public async fetchCar(
    id: string,
  ): Promise<ResultHandlerType<Car, ErrorsTypes>> {
    try {
      const carFound = await this.carRepository.fetchCar(id);
      if (!carFound) {
        return this.response.notFound<null, string>('Car not found.');
      }
      return this.response.success<Car, null>(carFound, null);
    } catch (error) {
      return this.response.error<ErrorsTypes>(error);
    }
  }

  public async modifyCar(
    car: Car,
  ): Promise<ResultHandlerType<Car, ErrorsTypes>> {
    try {
      await this.validation.update(car);
      const { id } = car;
      const modifiedCar = await this.carRepository.modifyCar(id, car);
      if (modifiedCar === null) {
        return this.response.notFound<null, string>('Car not found.');
      }
      return this.response.success<Car, null>(modifiedCar, null);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: string[] = error.errors;
        return this.response.badRequest<null, string[]>(validationErrors);
      }
      return this.response.error<ErrorsTypes>(error);
    }
  }

  public async deleteCar(
    id: string,
  ): Promise<ResultHandlerType<string, ErrorsTypes>> {
    try {
      const deleteCar = await this.carRepository.deleteCar(id);

      if (deleteCar === null) {
        return this.response.notFound<null, string>('Car not found.');
      }
      return this.response.success<string, null>('Car deleted.', null);
    } catch (error) {
      return this.response.error<ErrorsTypes>(error);
    }
  }
}
