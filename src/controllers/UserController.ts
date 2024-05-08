import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
  constructor(@inject('UserService') private UserService: UserService) {}

  async read(request: Request, response: Response) {
    const id = String(request.params.id);
    const { status, ...rest } = await this.UserService.fetchUser(id);
    return response.status(status).json(rest);
  }

  async create(request: Request, response: Response) {
    const { status, ...rest } = await this.UserService.addUser(request.body);
    return response.status(status).json(rest);
  }

  async update(request: Request, response: Response) {
    const id = String(request.params.id);
    const { status, ...rest } = await this.UserService.modifyUser({
      id,
      ...request.body,
    });
    return response.status(status).json(rest);
  }

  async delete(request: Request, response: Response) {
    const id = String(request.params.id);
    const { status, ...rest } = await this.UserService.removeUser(id);
    return response.status(status).json(rest);
  }
}
