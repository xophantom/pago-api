export interface ResultHandlerType<DataType, ErrType> {
  status: number;
  data: DataType;
  error: ErrType;
}
