export interface ResponseApiOnSucessOrErrorType<DataType, ErrType> {
  status: number;
  data: DataType;
  error: ErrType;
}
