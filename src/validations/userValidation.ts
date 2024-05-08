import { User } from '@prisma/client';
import * as yup from 'yup';

export const validateUser = {
  create: async (payload: User) => {
    try {
      await yup
        .object()
        .shape({
          email: yup.string().email().required('E-mail required'),
          name: yup.string().required('Name required'),
        })
        .validate(payload, { abortEarly: false });
    } catch (error) {
      throw new yup.ValidationError(error.errors, payload, 'validateaddUser');
    }
  },

  update: async (payload: User) => {
    try {
      await yup
        .object()
        .shape({
          email: yup
            .string()
            .email()
            .test(
              'e-mail',
              'E-mail required',
              (value) => typeof value === 'string',
            ),
          name: yup
            .string()
            .test(
              'name',
              'Name required',
              (value) => typeof value === 'string',
            ),
        })
        .validate(payload, { abortEarly: false });
    } catch (error) {
      throw new yup.ValidationError(
        error.errors,
        payload,
        'validatemodifyUser',
      );
    }
  },
};
