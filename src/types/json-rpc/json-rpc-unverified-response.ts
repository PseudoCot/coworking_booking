import { JsonRpcErrorData } from './json-rpc-error-data';

export type JsonRpcUnverifiedResponce<ResponseData> = {
  jsonrpc: string;
  id: string | number;
  result?: ResponseData;
  error?: JsonRpcErrorData;
};
