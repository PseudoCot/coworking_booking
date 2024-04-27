import { JsonRpcErrorCode } from './json-rpc-error-code';

export type JsonRpcErrorData = {
  code: JsonRpcErrorCode;
  message: string;
  data?: string;
};
