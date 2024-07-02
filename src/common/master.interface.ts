export enum DefaultStatus {
  FAILED = 'Failed',
  SUCCESS = 'Success',
}

export interface FormatServiceResponse<T> {
  status: DefaultStatus;
  data: T;
}
