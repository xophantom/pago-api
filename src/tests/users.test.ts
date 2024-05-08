import 'reflect-metadata';
import { User } from '@prisma/client';
import ResultHandler from '../utils/responses';
import { UserService } from '../services/UserService';
import { MockUserRepository } from '../repositories/MockUserRepository';

const sampleUser: User = {
  id: 'e09332c-f9cc-493e-9dd3-6254b4fa8909',
  name: 'Leo',
  email: 'email@gmail.com',
  created_at: new Date(),
  updated_at: null,
};

const invalidUser = {
  id: 1,
  email: 13455,
  created_at: new Date(),
  updated_at: null,
};

const resultHandler = new ResultHandler();

describe('UserManager', () => {
  const userRepository = new MockUserRepository();
  const userService = new UserService(userRepository);

  describe('addUser', () => {
    it('should add a user successfully', async () => {
      const newUser = await userService.addUser(sampleUser);

      expect(newUser).toEqual(
        resultHandler.created<User, null>(sampleUser, null),
      );
    });

    it('should return an error when adding a user fails', async () => {
      const newUser = await userService.addUser(invalidUser as unknown as User);

      expect(newUser).toEqual(
        resultHandler.badRequest<null, string[]>(
          newUser.error as unknown as string[],
        ),
      );
    });
  });

  describe('fetchUser', () => {
    it('should retrieve a user by id', async () => {
      await userRepository.addUser(sampleUser);

      const retrievedUser = await userService.fetchUser(
        'de09332c-f9cc-493e-9dd3-6254b4fa8909',
      );

      expect(retrievedUser).toEqual(
        resultHandler.success<User, null>(retrievedUser.data, null),
      );
    });

    it('should return an error if the user is not found', async () => {
      await userRepository.addUser(sampleUser);

      const retrievedUser = await userService.fetchUser(
        '0c0e5bba-227a-497b-8174-b9cf3903c1c5',
      );

      expect(retrievedUser).toEqual(
        resultHandler.notFound<null, string>(
          retrievedUser.error as unknown as string,
        ),
      );
    });
  });

  describe('modifyUser', () => {
    it('should successfully update a user', async () => {
      const newUser = await userRepository.addUser(sampleUser);

      const modifiedUser: User = {
        id: newUser.id,
        name: 'updated name',
        email: 'updated@email.com',
        created_at: newUser.created_at,
        updated_at: new Date(),
      };

      const result = await userService.modifyUser(modifiedUser);

      expect(result).toEqual(
        resultHandler.success<User, null>(result.data, null),
      );
    });

    it('should return an error during user update', async () => {
      const modifyUser = await userService.modifyUser(
        invalidUser as unknown as User,
      );

      expect(modifyUser).toEqual(
        resultHandler.badRequest<null, string[]>(
          modifyUser.error as unknown as string[],
        ),
      );
    });

    it('should return an error if user to update is not found', async () => {
      await userRepository.addUser(sampleUser);

      const result = await userService.removeUser(
        '0c0e5bba-227a-497b-8174-b9cf3903c1c5',
      );

      expect(result).toEqual(
        resultHandler.notFound<null, string>(result.error as unknown as string),
      );
    });
  });

  describe('removeUser', () => {
    it('should successfully delete a user by id', async () => {
      await userRepository.addUser(sampleUser);

      const result = await userService.removeUser(
        'de09332c-f9cc-493e-9dd3-6254b4fa8909',
      );

      expect(result).toEqual(
        resultHandler.success<string, null>(result.data, null),
      );
    });

    it('should return an error if user to delete is not found', async () => {
      await userRepository.addUser(sampleUser);

      const result = await userService.removeUser(
        '0c0e5bba-227a-497b-8174-b9cf3903c1c5',
      );

      expect(result).toEqual(
        resultHandler.notFound<null, string>(result.error as unknown as string),
      );
    });
  });
});
