import express from 'express';
import { UserController } from '../controllers/UserController';
import { container } from 'tsyringe';

const userController = container.resolve(UserController);

const router = express.Router();

router.get('/:id', (request, response) =>
  userController.read(request, response),
);
router.post('/add', (request, response) =>
  userController.create(request, response),
);
router.put('/modify/:id', (request, response) =>
  userController.update(request, response),
);
router.delete('/delete/:id', (request, response) =>
  userController.delete(request, response),
);

export default router;
