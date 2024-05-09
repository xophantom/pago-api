import 'reflect-metadata';
import { User } from '@prisma/client';
import ResultHandler from '../utils/responses';
import { UserService } from '../services/UserService';
import { MockUserRepository } from '../repositories/user/MockUserRepository';

const sampleUser: User = {
  id: 'e09332c-f9cc-493e-9dd3-6254b4fa8909',
  name: 'Leo',
  email: 'email@gmail.com',
  created_at: new Date(),
  updated_at: null,
};

const resultHandler = new ResultHandler();
const userRepository = new MockUserRepository();
const userService = new UserService(userRepository);

beforeEach(() => {
  userRepository.clearUsers();
  userRepository.addUser.mockClear();
  userRepository.fetchUser.mockClear();
  userRepository.modifyUser.mockClear();
  userRepository.removeUser.mockClear();
});

describe('UserManager', () => {
  describe('addUser', () => {
    it('should add a user successfully', async () => {
      const newUser = await userService.addUser(sampleUser);
      expect(newUser).toEqual(
        resultHandler.created<User, null>(sampleUser, null),
      );
    });

    it('should return an error when adding a user fails', async () => {
      const result = await userService.addUser(undefined as unknown as User);
      expect(result.status).toBe(400);
      expect(result.error).toEqual(
        expect.arrayContaining(['E-mail required', 'Name required']),
      );
    });
  });

  describe('fetchUser', () => {
    it('should retrieve a user by id', async () => {
      await userRepository.addUser(sampleUser);
      const retrievedUser = await userService.fetchUser(sampleUser.id);
      expect(retrievedUser).toEqual(
        resultHandler.success<User, null>(sampleUser, null),
      );
    });

    it('should return an error if the user is not found', async () => {
      const retrievedUser = await userService.fetchUser('non-existent-id');
      expect(retrievedUser).toEqual(
        resultHandler.notFound<null, string>('User not found'),
      );
    });
  });

  describe('modifyUser', () => {
    it('should successfully update a user', async () => {
      userRepository.addUser(sampleUser);
      const modifiedUser = { ...sampleUser, name: 'Updated Leo' };
      userRepository.modifyUser.mockResolvedValue(modifiedUser);

      const result = await userService.modifyUser(modifiedUser);
      expect(result).toEqual(
        resultHandler.success<User, null>(modifiedUser, null),
      );
    });
  });

  describe('removeUser', () => {
    it('should successfully delete a user by id', async () => {
      userRepository.removeUser.mockResolvedValue();
      const result = await userService.removeUser(sampleUser.id);
      expect(result).toEqual(
        resultHandler.success<string, null>('User deleted.', null),
      );
    });
  });
});
