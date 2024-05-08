import { JsonRpcErrorData } from './json-rpc-error-data';

export type JsonRpcResponce<ResponseData> = {
  jsonrpc: string;
  id: string | number;
  result?: ResponseData;
  error?: JsonRpcErrorData;
};
