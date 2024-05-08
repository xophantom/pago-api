import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CarService } from '../services/CarService';

export class CarController {
  private CarService = container.resolve(CarService);

  async create(request: Request, response: Response) {
    const { status, ...rest } = await this.CarService.addCar(request.body);
    return response.status(status).json(rest);
  }

  async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const { status, ...rest } = await this.CarService.modifyCar({
      id,
      ...request.body,
    });
    return response.status(status).json(rest);
  }

  async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const { status, ...rest } = await this.CarService.deleteCar(id);
    return response.status(status).json(rest);
  }

  async read(request: Request, response: Response) {
    const id = String(request.params.id);
    const { status, ...rest } = await this.CarService.fetchCar(id);
    return response.status(status).json(rest);
  }
}
