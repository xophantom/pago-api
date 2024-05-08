import { User } from '@prisma/client';
import * as yup from 'yup';
import { IUserRepository } from '../repositories/user/IUserRepository';
import { ResultHandlerType } from '../types/response_type';
import { ErrorsTypes } from '../types/error';
import { validateUser } from '../validations/userValidation';
import { inject, injectable } from 'tsyringe';
import ResultHandler from '../utils/responses';

@injectable()
export class UserService {
  private response = new ResultHandler();
  private validation = validateUser;

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async fetchUser(
    id: string,
  ): Promise<ResultHandlerType<User, ErrorsTypes>> {
    try {
      const userFound = await this.userRepository.fetchUser(id);

      if (!userFound) {
        return this.response.notFound<null, string>('User not found');
      }
      return this.response.success<User, null>(userFound, null);
    } catch (error) {
      return this.response.error<ErrorsTypes>(error);
    }
  }

  public async addUser(
    user: User,
  ): Promise<ResultHandlerType<User, ErrorsTypes>> {
    try {
      await this.validation.create(user);
      const newUser = await this.userRepository.addUser(user);

      return this.response.created<User, null>(newUser, null);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: string[] = error.errors;

        return this.response.badRequest<null, string[]>(validationErrors);
      }

      return this.response.error<ErrorsTypes>(error);
    }
  }

  public async modifyUser(
    user: User,
  ): Promise<ResultHandlerType<User, ErrorsTypes>> {
    try {
      await this.validation.update(user);
      const { id } = user;
      const modifyUser = await this.userRepository.modifyUser(id, user);

      if (modifyUser === null) {
        return this.response.notFound<null, string>('User not found');
      }
      return this.response.success<User, null>(modifyUser, null);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: string[] = error.errors;

        return this.response.badRequest<null, string[]>(validationErrors);
      }
      return this.response.error<ErrorsTypes>(error);
    }
  }

  public async removeUser(
    id: string,
  ): Promise<ResultHandlerType<string, ErrorsTypes>> {
    try {
      const removeUser = await this.userRepository.removeUser(id);

      if (removeUser === null) {
        return this.response.notFound<null, string>('User not found');
      }

      return this.response.success<string, null>('User deleted.', null);
    } catch (error) {
      return this.response.error<ErrorsTypes>(error);
    }
  }
}
