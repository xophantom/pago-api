import { Car } from '@prisma/client';
import * as yup from 'yup';

export const validateCar = {
  create: async (payload: Car) => {
    try {
      await yup
        .object()
        .shape({
          model: yup.string().required('Model is required'),
          year: yup
            .number()
            .min(1885, 'Year must be after 1885')
            .required('Year is required'),
          ownerId: yup
            .string()
            .uuid('Owner ID must be a valid UUID')
            .required('Owner ID is required'),
        })
        .validate(payload, { abortEarly: false });
    } catch (error) {
      throw new yup.ValidationError(error.errors, payload, 'carCreate');
    }
  },

  update: async (payload: Car) => {
    try {
      await yup
        .object()
        .shape({
          model: yup
            .string()
            .test(
              'is-string',
              'Model must be a string',
              (value) => typeof value === 'string',
            ),
          year: yup
            .number()
            .min(1885, 'Year must be after 1885')
            .test(
              'is-number',
              'Year must be a valid number',
              (value) => typeof value === 'number',
            ),
          ownerId: yup
            .string()
            .uuid('Owner ID must be a valid UUID')
            .test(
              'is-uuid',
              'Owner ID must be a UUID',
              (value) => typeof value === 'string',
            ),
        })
        .validate(payload, { abortEarly: false });
    } catch (error) {
      throw new yup.ValidationError(error.errors, payload, 'carUpdate');
    }
  },
};
