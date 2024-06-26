import { ResultHandlerType } from '../types/response_type';

export default class ResultHandler {
  created<DataType, ErrType>(
    data: DataType,
    err: ErrType,
  ): ResultHandlerType<DataType, ErrType> {
    return {
      status: 201,
      data,
      error: err,
    };
  }

  notFound<DataType, ErrType>(
    err: ErrType,
  ): ResultHandlerType<DataType, ErrType> {
    return {
      status: 404,
      data: null,
      error: err,
    };
  }

  success<DataType, ErrType>(
    data: DataType,
    err: ErrType,
  ): ResultHandlerType<DataType, ErrType> {
    return {
      status: 200,
      data,
      error: err,
    };
  }

  badRequest<DataType, ErrType>(
    err: ErrType,
  ): ResultHandlerType<DataType, ErrType> {
    return {
      status: 400,
      data: null,
      error: err,
    };
  }

  error<ErrType>(error: ErrType): ResultHandlerType<null, ErrType> {
    return {
      status: 500,
      data: null,
      error,
    };
  }
}
