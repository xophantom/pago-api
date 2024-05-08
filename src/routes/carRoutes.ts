import express from 'express';
import { CarController } from '../controllers/CarController';
import { container } from 'tsyringe';

const carController = container.resolve(CarController);

const router = express.Router();

router.get('/:id', (request, response) =>
  carController.read(request, response),
);
router.post('/add', (request, response) =>
  carController.create(request, response),
);
router.put('/modify/:id', (request, response) =>
  carController.update(request, response),
);
router.delete('/delete/:id', (request, response) =>
  carController.delete(request, response),
);

export default router;
